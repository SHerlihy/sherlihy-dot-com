variable "log_group_arn" {
  type = string
}

data "aws_region" "current" {}

locals {
  api_stage_name = "prod"
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

resource "aws_lambda_function" "api_key_authorizer" {
  filename         = data.archive_file.access_logs_lambda.output_path
  function_name    = "stream_logs_api_key_authorizer"
  role             = aws_iam_role.stream_lambda.arn
  handler          = "authorizer.handler"
  source_code_hash = data.archive_file.access_logs_lambda.output_base64sha256

  runtime = "nodejs24.x"

  memory_size = 128
  timeout     = 5
}

resource "aws_api_gateway_rest_api" "stream_logs" {
  name           = "access-logs-stream"
  api_key_source = "AUTHORIZER"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_authorizer" "api_key" {
  name                             = "access-logs-api-key-query"
  rest_api_id                      = aws_api_gateway_rest_api.stream_logs.id
  authorizer_uri                   = aws_lambda_function.api_key_authorizer.invoke_arn
  authorizer_result_ttl_in_seconds = 0
  identity_source                  = "method.request.querystring.api_key"
  type                             = "REQUEST"
}

resource "aws_api_gateway_method" "stream_logs" {
  rest_api_id      = aws_api_gateway_rest_api.stream_logs.id
  resource_id      = aws_api_gateway_rest_api.stream_logs.root_resource_id
  http_method      = "GET"
  authorization    = "CUSTOM"
  authorizer_id    = aws_api_gateway_authorizer.api_key.id
  api_key_required = true
}

resource "aws_api_gateway_integration" "stream_logs" {
  rest_api_id             = aws_api_gateway_rest_api.stream_logs.id
  resource_id             = aws_api_gateway_rest_api.stream_logs.root_resource_id
  http_method             = aws_api_gateway_method.stream_logs.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.stream_logs.response_streaming_invoke_arn
  response_transfer_mode  = "STREAM"
  timeout_milliseconds    = 300000
}

resource "aws_api_gateway_method" "cors" {
  rest_api_id   = aws_api_gateway_rest_api.stream_logs.id
  resource_id   = aws_api_gateway_rest_api.stream_logs.root_resource_id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "cors" {
  rest_api_id = aws_api_gateway_rest_api.stream_logs.id
  resource_id = aws_api_gateway_rest_api.stream_logs.root_resource_id
  http_method = aws_api_gateway_method.cors.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "cors" {
  rest_api_id = aws_api_gateway_rest_api.stream_logs.id
  resource_id = aws_api_gateway_rest_api.stream_logs.root_resource_id
  http_method = aws_api_gateway_method.cors.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Max-Age"       = true
  }
}

resource "aws_api_gateway_integration_response" "cors" {
  depends_on = [aws_api_gateway_integration.cors]

  rest_api_id = aws_api_gateway_rest_api.stream_logs.id
  resource_id = aws_api_gateway_rest_api.stream_logs.root_resource_id
  http_method = aws_api_gateway_method.cors.http_method
  status_code = aws_api_gateway_method_response.cors.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'accept,cache-control,content-type,x-api-key'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
    "method.response.header.Access-Control-Max-Age"       = "'86400'"
  }
}

resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id  = "AllowExecutionFromAccessLogsApiGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.stream_logs.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.stream_logs.execution_arn}/*/${aws_api_gateway_method.stream_logs.http_method}/"
}

resource "aws_lambda_permission" "allow_api_gateway_authorizer" {
  statement_id  = "AllowExecutionFromAccessLogsApiGatewayAuthorizer"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_key_authorizer.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.stream_logs.execution_arn}/authorizers/${aws_api_gateway_authorizer.api_key.id}"
}

resource "aws_api_gateway_deployment" "stream_logs" {
  rest_api_id = aws_api_gateway_rest_api.stream_logs.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_authorizer.api_key.id,
      aws_api_gateway_method.stream_logs.authorization,
      aws_api_gateway_method.stream_logs.authorizer_id,
      aws_api_gateway_integration.stream_logs.id,
      aws_api_gateway_integration.stream_logs.response_transfer_mode,
      aws_api_gateway_integration.cors.id,
      aws_api_gateway_integration_response.cors.id,
    ]))
  }

  depends_on = [
    aws_api_gateway_integration.stream_logs,
    aws_api_gateway_integration.cors,
    aws_api_gateway_integration_response.cors,
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "stream_logs" {
  rest_api_id   = aws_api_gateway_rest_api.stream_logs.id
  deployment_id = aws_api_gateway_deployment.stream_logs.id
  stage_name    = local.api_stage_name
}

resource "aws_api_gateway_method_settings" "stream_logs" {
  rest_api_id = aws_api_gateway_rest_api.stream_logs.id
  stage_name  = aws_api_gateway_stage.stream_logs.stage_name
  method_path = "*/*"

  settings {
    throttling_burst_limit = 2
    throttling_rate_limit  = 1
  }
}

resource "aws_api_gateway_api_key" "stream_logs" {
  name    = "access-logs-stream"
  enabled = true
}

resource "aws_api_gateway_usage_plan" "stream_logs" {
  name = "access-logs-stream"

  api_stages {
    api_id = aws_api_gateway_rest_api.stream_logs.id
    stage  = aws_api_gateway_stage.stream_logs.stage_name
  }

  quota_settings {
    limit  = 100
    period = "MONTH"
  }

  throttle_settings {
    burst_limit = 2
    rate_limit  = 1
  }
}

resource "aws_api_gateway_usage_plan_key" "stream_logs" {
  key_id        = aws_api_gateway_api_key.stream_logs.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.stream_logs.id
}

output "endpoint" {
  value = aws_api_gateway_stage.stream_logs.invoke_url
}

output "api_key" {
  value = nonsensitive(aws_api_gateway_api_key.stream_logs.value)
}
