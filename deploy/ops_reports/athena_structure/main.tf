variable "distribution_id" {
  type = string
}

variable "table_name" {
  type = string
}

variable "input_bucket" {
  type = string
}

variable "output_bucket" {
  type = string
}

locals {
  cloudfront_logs_s3_prefix  = "s3://${var.input_bucket}/AWSLogs/aws-account-id=${data.aws_caller_identity.current.account_id}/CloudFront"
  cloudfront_logs_s3_pattern = "${local.cloudfront_logs_s3_prefix}/distributionid=$${distributionid}/year=$${year}/month=$${month}/day=$${day}/hour=$${hour}/"
}

data "aws_caller_identity" "current" {}

resource "aws_athena_database" "ops_results" {
  name   = "ops_results"
  bucket = var.output_bucket
}

resource "aws_glue_catalog_table" "hourly_ops_table" {
  name          = var.table_name
  database_name = aws_athena_database.ops_results.name
  table_type    = "EXTERNAL_TABLE"

  parameters = {
    EXTERNAL                           = "TRUE"
    classification                     = "json"
    "projection.enabled"               = "true"
    "projection.distributionid.type"   = "enum"
    "projection.distributionid.values" = var.distribution_id
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

output "database_name" {
  value = aws_athena_database.ops_results.name
}
