variable "query_id" {
  type = string
}

variable "rate" {
    type = string
}

variable "notification_email" {
  type        = string
  description = "Email address subscribed to scheduled HTTP error count notifications."
}

variable "name_prefix" {
  type        = string
  description = "Prefix used for scheduled query resources."
  default     = "scheduled-athena-query"
}

locals {
  lambda_name = "${var.name_prefix}-runner"
}

data "archive_file" "lambda" {
  type        = "zip"
  source_file = "${path.module}/call_query.py"
  output_path = "${path.module}/call_query.zip"
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda" {
  name               = "${local.lambda_name}-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_sns_topic" "error_counts" {
  name = "${var.name_prefix}-error-counts"
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.error_counts.arn
  protocol  = "email"
  endpoint  = var.notification_email
}

data "aws_iam_policy_document" "lambda_athena" {
  statement {
    actions = [
      "athena:GetNamedQuery",
      "athena:GetQueryExecution",
      "athena:GetQueryResults",
      "athena:StartQueryExecution",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "glue:*",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "s3:*",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "sns:Publish",
    ]

    resources = [aws_sns_topic.error_counts.arn]
  }
}

resource "aws_iam_role_policy" "lambda_athena" {
  name   = "${local.lambda_name}-athena"
  role   = aws_iam_role.lambda.id
  policy = data.aws_iam_policy_document.lambda_athena.json
}

resource "aws_lambda_function" "runner" {
  function_name    = local.lambda_name
  role             = aws_iam_role.lambda.arn
  runtime          = "python3.12"
  handler          = "call_query.lambda_handler"
  filename         = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256
  timeout          = 300

  environment {
    variables = {
      ATHENA_NAMED_QUERY_ID = var.query_id
      SNS_TOPIC_ARN         = aws_sns_topic.error_counts.arn
    }
  }
}

resource "aws_cloudwatch_event_rule" "schedule" {
  name                = "${var.name_prefix}-schedule"
  schedule_expression = "rate(${var.rate} hours)"
}

resource "aws_cloudwatch_event_target" "lambda" {
  rule      = aws_cloudwatch_event_rule.schedule.name
  target_id = "RunAthenaNamedQuery"
  arn       = aws_lambda_function.runner.arn
}

resource "aws_lambda_permission" "allow_eventbridge" {
  statement_id  = "AllowEventBridgeInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.runner.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.schedule.arn
}
