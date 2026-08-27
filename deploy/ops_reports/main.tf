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
    key    = "ops_reports/terraform.tfstate"
    region = "eu-west-2"
  }
}

provider "aws" {
  profile = "sherlihydtcom"
}

variable "notification_email" {
  type = string
  default = "steven0herlihy+sherlihydtcom@gmail.com"
}

module "names" {
  source = "../names"
}

locals {
  table_name = "hourly_ops_table"
  rate = "24"
}

data "aws_ssm_parameter" "log_source_name" {
  name = module.names.log_source_name
}

module "cdn_logs" {
  source = "./cdn_logs"

  source_name = data.aws_ssm_parameter.log_source_name.value
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

data "aws_ssm_parameter" "cloudfront_distribution_id" {
  name = module.names.cloudfront_distribution_id
}

module "athena_structure" {
  source = "./athena_structure"

  distribution_id = data.aws_ssm_parameter.cloudfront_distribution_id.value
  table_name      = local.table_name
  input_bucket    = module.cdn_logs.bucket_name
  output_bucket   = aws_s3_bucket.athena_results.bucket
}

module "output_errors" {
  source = "./output_errors"

  distribution_id = data.aws_ssm_parameter.cloudfront_distribution_id.value
  output_bucket   = aws_s3_bucket.athena_results.bucket
  database_name   = module.athena_structure.database_name
  table_name      = local.table_name
  rate = local.rate
}

module "schedule_query" {
  source = "./schedule_query"

  notification_email = var.notification_email
  query_id           = module.output_errors.query_id
  rate = local.rate
}
