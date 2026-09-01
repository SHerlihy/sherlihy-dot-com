module "names" {
  source = "../../names"
}

data "aws_ssm_parameter" "log_source_name" {
  name = module.names.log_source_name
}

data "aws_ssm_parameter" "cloudfront_distribution_id" {
  name = module.names.cloudfront_distribution_id
}

resource "aws_cloudwatch_log_group" "cloudfront_logs" {
  name              = "/aws/cloudfront/${data.aws_ssm_parameter.cloudfront_distribution_id.value}"
  retention_in_days = 3 
}

resource "aws_cloudwatch_log_delivery_destination" "cloudwatch_user_access" {
  region        = "us-east-1"
  name          = "cloudwatch-access_logs"
  output_format = "parquet"

  delivery_destination_configuration {
    destination_resource_arn = aws_cloudwatch_log_group.cloudfront_logs.arn
  }
}

resource "aws_cloudwatch_log_delivery" "cloudwatch_user_access" {
  region                   = "us-east-1"
  delivery_source_name     = data.aws_ssm_parameter.log_source_name.value
  delivery_destination_arn = aws_cloudwatch_log_delivery_destination.cloudwatch_user_access.arn

  depends_on = [
    aws_cloudwatch_log_group.cloudfront_logs,
  ]

  record_fields = [
    "date",
    "time",
    "x-edge-location",
    "sc-bytes",
    "cs-method",
    "cs-host",
    "cs-uri-stem",
    "sc-status",
    "cs-referer",
    "cs-user-agent",
    "cs-uri-query",
    "cs-cookie",
    "x-edge-result-type",
    "x-edge-request-id",
    "x-host-header",
    "cs-protocol",
    "cs-bytes",
    "time-taken",
    "x-forwarded-for",
    "ssl-protocol",
    "ssl-cipher",
    "x-edge-response-result-type",
    "cs-protocol-version",
    "fle-status",
    "fle-encrypted-fields",
    "c-port",
    "time-to-first-byte",
    "x-edge-detailed-result-type",
    "sc-content-len",
    "sc-range-start",
    "sc-range-end",
    "c-country",
    "viewer-request-log-data",
    "viewer-response-log-data"
  ]
}
