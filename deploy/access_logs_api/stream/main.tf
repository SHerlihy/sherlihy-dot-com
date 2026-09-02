variable "log_group_name" {
  type = string
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
  role       = aws_iam_role.role.name
  policy_arn = data.aws_iam_policy.lambda_basic_execution.arn
}

data "archive_file" "access_logs_lambda" {
  type        = "zip"
  source_dir  = "${path.module}"
  output_path = "${path.module}/access-logs-api.zip"
}

# Choosing 24 due to https://docs.aws.amazon.com/lambda/latest/dg/config-rs-write-functions.html#config-rs-write-functions-end

resource "aws_lambda_function" "stream_logs" {
  filename      = data.archive_file.access_logs_lambda.output_path
  function_name = "stream_logs"
  role          = aws_iam_role.stream_lambda.arn
  handler       = "index.handler"
  code_sha256   = data.archive_file.access_logs_lambda.output_base64sha256

  runtime = "nodejs24.x"

  memory_size = 128
  timeout = 300

  environment {
    variables = {
      LOG_GROUP_NAME = var.log_group_name
      LOG_FILTER_PATTERN = "-ping -healthz"
    }
  }
}

resource "aws_lambda_function_url" "stream_logs" {
  authorization_type = "NONE"
  function_name      = aws_lambda_function.stream_logs.function_name

  invoke_mode        = "RESPONSE_STREAM"

  cors {
    allow_origins     = ["https://sherlihy.com/*", "http://localhost:3000"]
    allow_methods     = ["GET", "OPTIONS"]

    allow_headers     = ["accept", "content-type", "cache-control"]
    expose_headers    = ["content-type", "transfer-encoding", "cache-control", "connection"]

    max_age           = 86400
    allow_credentials = false
  }
}

output "endpoint" {
  value = aws_lambda_function_url.stream_logs.function_url
}
