terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.7"
    }
  }

  backend "s3" {
    bucket = "state-bucket-82f5696f9e0c0e51a2e8769e08"
    key    = "access_logs_api/terraform.tfstate"
    region = "eu-west-2"
  }
}

provider "aws" {
  profile = "sherlihydtcom"
  region  = "us-east-1"
}

module "cloudwatch" {
  source = "./log_group"
}

data "archive_file" "access_logs_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/lambda"
  output_path = "${path.module}/.terraform/access-logs-api.zip"
}

data "aws_iam_policy_document" "access_logs_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "access_logs_lambda" {
  name               = "access-logs-api-lambda"
  assume_role_policy = data.aws_iam_policy_document.access_logs_assume_role.json
}

data "aws_iam_policy_document" "access_logs_lambda" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = ["arn:aws:logs:*:*:*"]
  }

  statement {
    actions = [
      "logs:FilterLogEvents",
    ]

    resources = [
      module.cloudwatch.log_group_arn,
      "${module.cloudwatch.log_group_arn}:*",
    ]
  }
}

resource "aws_iam_role_policy" "access_logs_lambda" {
  name   = "access-logs-api"
  role   = aws_iam_role.access_logs_lambda.id
  policy = data.aws_iam_policy_document.access_logs_lambda.json
}

resource "aws_lambda_function" "access_logs_api" {
  function_name    = "access-logs-api"
  role             = aws_iam_role.access_logs_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  filename         = data.archive_file.access_logs_lambda.output_path
  source_code_hash = data.archive_file.access_logs_lambda.output_base64sha256
  timeout          = 120
  memory_size      = 256

  environment {
    variables = {
      LOG_GROUP_NAME = module.cloudwatch.log_group_name
      LOG_REGION     = "us-east-1"
      DEFAULT_LIMIT  = "100"
      MAX_LIMIT      = "500"
    }
  }
}

resource "aws_lambda_function_url" "access_logs_api" {
  function_name      = aws_lambda_function.access_logs_api.function_name
  authorization_type = "NONE"
  invoke_mode        = "RESPONSE_STREAM"

  cors {
    allow_origins = ["*"]
    allow_methods = ["GET"]
    allow_headers = ["content-type"]
    expose_headers = [
      "content-type",
    ]
  }
}

resource "aws_lambda_permission" "function_url" {
  statement_id           = "AllowPublicFunctionUrlInvoke"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.access_logs_api.function_name
  principal              = "*"
  function_url_auth_type = aws_lambda_function_url.access_logs_api.authorization_type
}

output "access_logs_stream_url" {
  value = aws_lambda_function_url.access_logs_api.function_url
}
