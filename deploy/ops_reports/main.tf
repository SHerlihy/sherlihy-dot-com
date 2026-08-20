terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  profile = "sherlihydtcom"
}

module "names" {
  source = "../names"
}

data "aws_caller_identity" "current" {}

data "aws_ssm_parameter" "log_source_name" {
  name = module.names.log_source_name
}

data "aws_ssm_parameter" "cloudfront_distribution_id" {
  name = module.names.cloudfront_distribution_id
}

resource "aws_s3_bucket" "user_access" {
  bucket_prefix = "user-access-"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "user_access" {
  bucket                  = aws_s3_bucket.user_access.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudwatch_log_delivery_destination" "user_access" {
  region        = "us-east-1"
  name          = "user_access-destination"
  output_format = "json"

  delivery_destination_configuration {
    destination_resource_arn = aws_s3_bucket.user_access.arn
  }
}

resource "aws_cloudwatch_log_delivery" "user_access" {
  region                   = "us-east-1"
  delivery_source_name     = data.aws_ssm_parameter.log_source_name.value
  delivery_destination_arn = aws_cloudwatch_log_delivery_destination.user_access.arn

  depends_on = [
    aws_s3_bucket_policy.user_access_log_delivery,
  ]

  record_fields = [
    "date",
    "time",
    "time-taken",
    "c-country",
    "sc-status",
  ]
  s3_delivery_configuration {
    enable_hive_compatible_path = true
    suffix_path                 = "{distributionid}/{yyyy}/{MM}/{dd}/{HH}/"
  }
}

data "aws_iam_policy_document" "user_access_log_delivery" {
  statement {
    sid = "AWSLogDeliveryAclCheck"

    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }

    actions = [
      "s3:GetBucketAcl",
      "s3:ListBucket",
    ]

    resources = [
      aws_s3_bucket.user_access.arn,
    ]

    condition {
      test     = "StringEquals"
      variable = "aws:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = ["arn:aws:logs:us-east-1:${data.aws_caller_identity.current.account_id}:*"]
    }
  }

  statement {
    sid = "AWSLogDeliveryWrite"

    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }

    actions = [
      "s3:PutObject",
    ]

    resources = [
      "${aws_s3_bucket.user_access.arn}/AWSLogs/aws-account-id=${data.aws_caller_identity.current.account_id}/CloudFront/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = ["arn:aws:logs:us-east-1:${data.aws_caller_identity.current.account_id}:*"]
    }
  }
}

resource "aws_s3_bucket_policy" "user_access_log_delivery" {
  bucket = aws_s3_bucket.user_access.id
  policy = data.aws_iam_policy_document.user_access_log_delivery.json
}

resource "aws_s3_bucket" "athena_results" {
  bucket_prefix = "user-access-results-"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "athena_results" {
  bucket                  = aws_s3_bucket.athena_results.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_athena_workgroup" "ops_analysis" {
  name = "ops_analysis"

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true

    result_configuration {
      output_location = "s3://${aws_s3_bucket.athena_results.bucket}/outputs/"
    }
  }
}

resource "aws_athena_database" "ops_results" {
  name   = "ops_results"
  bucket = aws_s3_bucket.athena_results.bucket
}

locals {
  table_name                 = "hourly_ops_table"
  distribution_id_predicate  = data.aws_ssm_parameter.cloudfront_distribution_id.value
  cloudfront_logs_s3_prefix  = "s3://${aws_s3_bucket.user_access.bucket}/AWSLogs/aws-account-id=${data.aws_caller_identity.current.account_id}/CloudFront"
  cloudfront_logs_s3_pattern = "${local.cloudfront_logs_s3_prefix}/distributionid=$${distributionid}/year=$${year}/month=$${month}/day=$${day}/hour=$${hour}/"
}

resource "aws_glue_catalog_table" "hourly_ops_table" {
  name          = local.table_name
  database_name = aws_athena_database.ops_results.name
  table_type    = "EXTERNAL_TABLE"

  parameters = {
    EXTERNAL                           = "TRUE"
    classification                     = "json"
    "projection.enabled"               = "true"
    "projection.distributionid.type"   = "enum"
    "projection.distributionid.values" = data.aws_ssm_parameter.cloudfront_distribution_id.value
    "projection.year.type"             = "integer"
    "projection.year.range"            = "2020,2035"
    "projection.month.type"            = "integer"
    "projection.month.range"           = "1,12"
    "projection.month.digits"          = "2"
    "projection.day.type"              = "integer"
    "projection.day.range"             = "1,31"
    "projection.day.digits"            = "2"
    "projection.hour.type"             = "integer"
    "projection.hour.range"            = "0,23"
    "projection.hour.digits"           = "2"
    "storage.location.template"        = local.cloudfront_logs_s3_pattern
  }

  storage_descriptor {
    location      = "${local.cloudfront_logs_s3_prefix}/"
    input_format  = "org.apache.hadoop.mapred.TextInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat"

    ser_de_info {
      serialization_library = "org.openx.data.jsonserde.JsonSerDe"

      parameters = {
        "mapping.time_taken" = "time-taken"
        "mapping.location"   = "c-country"
        "mapping.status"     = "sc-status"
      }
    }

    columns {
      name = "date"
      type = "date"
    }

    columns {
      name = "time"
      type = "string"
    }

    columns {
      name = "time_taken"
      type = "float"
    }

    columns {
      name = "location"
      type = "string"
    }

    columns {
      name = "status"
      type = "int"
    }
  }

  partition_keys {
    name = "distributionid"
    type = "string"
  }

  partition_keys {
    name = "year"
    type = "string"
  }

  partition_keys {
    name = "month"
    type = "string"
  }

  partition_keys {
    name = "day"
    type = "string"
  }

  partition_keys {
    name = "hour"
    type = "string"
  }
}

resource "aws_athena_named_query" "latency_by_location" {
  name      = "latency_by_location"
  workgroup = aws_athena_workgroup.ops_analysis.id
  database  = aws_athena_database.ops_results.name
  query     = <<EOF
  SELECT 
    location AS country_code,
    COUNT(*) AS total_requests,
    ROUND(AVG(time_taken), 3) AS avg_latency_seconds,
    ROUND(MAX(time_taken), 3) AS max_latency_seconds
FROM 
    ${aws_athena_database.ops_results.name}.${local.table_name}
WHERE 
    status = 200 
    AND distributionid = '${local.distribution_id_predicate}'
    AND concat(year, '-', month, '-', day) BETWEEN CAST(current_date - INTERVAL '1' DAY AS varchar)
        AND CAST(current_date AS varchar)
    AND date >= CURRENT_DATE - INTERVAL '1' DAY
    AND parse_datetime(concat(CAST(date AS varchar), ' ', time), 'yyyy-MM-dd HH:mm:ss') 
        >= current_timestamp - INTERVAL '2' HOUR
GROUP BY 
    location
HAVING 
    COUNT(*) > 10
ORDER BY 
    avg_latency_seconds DESC;
EOF
}

resource "aws_athena_named_query" "status_by_category" {
  name      = "status_by_category"
  workgroup = aws_athena_workgroup.ops_analysis.id
  database  = aws_athena_database.ops_results.name
  query     = <<EOF
SELECT 
    CASE 
        WHEN status BETWEEN 200 AND 299 THEN '2xx Success'
        WHEN status BETWEEN 300 AND 399 THEN '3xx Redirection'
        WHEN status BETWEEN 400 AND 499 THEN '4xx Client Error'
        WHEN status BETWEEN 500 AND 599 THEN '5xx Server Error'
        ELSE 'Other'
    END AS status_category,
    status AS http_status,
    COUNT(*) AS total_requests,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM 
    ${aws_athena_database.ops_results.name}.${local.table_name}
WHERE 
    distributionid = '${local.distribution_id_predicate}'
    AND concat(year, '-', month, '-', day) BETWEEN CAST(current_date - INTERVAL '1' DAY AS varchar)
        AND CAST(current_date AS varchar)
    AND date >= CURRENT_DATE - INTERVAL '1' DAY
    AND parse_datetime(concat(CAST(date AS varchar), ' ', time), 'yyyy-MM-dd HH:mm:ss') 
        >= current_timestamp - INTERVAL '2' HOUR
GROUP BY 
    1, 2
ORDER BY 
    total_requests DESC;
EOF
}
#    "cs-method",
#    "cs(User-Agent)",
#    "cs-protocol",
