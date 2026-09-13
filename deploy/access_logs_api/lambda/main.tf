data "aws_region" "current" {}

locals {
  api_stage_name = "prod"
  route          = "observe"
}

resource "aws_api_gateway_resource" "stream_logs" {
  rest_api_id = var.api_id
  parent_id   = var.root_resource_id
  path_part   = local.route
}

resource "aws_api_gateway_method" "stream_logs" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.stream_logs.id
  http_method   = "GET"
  authorization = "NONE"
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "stream_lambda" {
  name               = "response-streaming-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "aws_iam_policy" "lambda_basic_execution" {
  name = "AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.stream_lambda.name
  policy_arn = data.aws_iam_policy.lambda_basic_execution.arn
}

data "aws_iam_policy_document" "use_live_tail" {
  statement {
    effect = "Allow"

    resources = [var.log_group_arn]
    actions   = ["logs:StartLiveTail"]
  }
}

resource "aws_iam_policy" "use_live_tail" {
  name   = "use-live-tail"
  policy = data.aws_iam_policy_document.use_live_tail.json
}

resource "aws_iam_role_policy_attachment" "use_live_tail" {
  role       = aws_iam_role.stream_lambda.name
  policy_arn = aws_iam_policy.use_live_tail.arn
}

data "archive_file" "access_logs_lambda" {
  type        = "zip"
  source_dir  = path.module
  output_path = "${path.module}/access-logs-api.zip"

  excludes = [
    "access-logs-api.zip",
    "main.tf",
  ]
}

# Choosing 24 due to https://docs.aws.amazon.com/lambda/latest/dg/config-rs-write-functions.html#config-rs-write-functions-end

resource "aws_lambda_function" "stream_logs" {
  filename         = data.archive_file.access_logs_lambda.output_path
  function_name    = "stream_logs"
  role             = aws_iam_role.stream_lambda.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.access_logs_lambda.output_base64sha256

  runtime = "nodejs24.x"

  memory_size = 128
  timeout     = 300

  # account limit is 10
  # reserved_concurrent_executions = 1

  environment {
    variables = {
      LOG_GROUP_ARN      = var.log_group_arn
      LOG_FILTER_PATTERN = "-ping -healthz"
      REGION             = data.aws_region.current.region
    }
  }
}

resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id  = "AllowExecutionFromAccessLogsApiGateway-${local.route}"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.stream_logs.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.execution_arn}/*/${aws_api_gateway_method.stream_logs.http_method}/${local.route}"
}

resource "aws_api_gateway_integration" "stream_logs" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.stream_logs.id
  http_method             = aws_api_gateway_method.stream_logs.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.stream_logs.invoke_arn
}
