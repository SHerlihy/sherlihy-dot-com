terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket = "state-bucket-82f5696f9e0c0e51a2e8769e08"
    key    = "host/terraform.tfstate"
    region = "eu-west-2"
  }
}

provider "aws" {
  profile = "sherlihydtcom"
}

locals {
  uuid         = "02d01d33-622a-421d-93de-410f503a438e"
  domain_name  = "sherlihy.com"
  project_name = "sherlihydtcom"
}

module "names" {
  source = "../names"
}

data "aws_ssm_parameter" "ssl_cert_arn" {
  name = module.names.ssl_cert_arn
}

data "aws_ssm_parameter" "ssl_validation_record_fqdns" {
  name = module.names.ssl_validation_record_fqdns
}

data "aws_ssm_parameter" "ssl_route_zone_id" {
  name = module.names.ssl_route_zone_id
}

module "s3" {
  source = "./create_s3"

  project_name = local.project_name
}

module "cdn" {
  source = "./cdn"

  bucket_regional_domain_name = module.s3.bucket_regional_domain_name

  domain_name = local.domain_name

  cert_arn                = data.aws_ssm_parameter.ssl_cert_arn.value
  validation_record_fqdns = split(",", data.aws_ssm_parameter.ssl_validation_record_fqdns.value)

  uuid = local.uuid
}

resource "aws_s3_bucket_policy" "cloudfront_access" {
  bucket = module.s3.bucket_id
  policy = data.aws_iam_policy_document.cloudfront_access.json
}

data "aws_iam_policy_document" "cloudfront_access" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${module.s3.bucket_arn}/*"
    ]


    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"

      values = [
        module.cdn.cdn_arn
      ]
    }
  }
}

module "alias" {
  source = "./alias"

  web_domain = local.domain_name
  cdn_domain = module.cdn.domain_name

  route_zone_id = data.aws_ssm_parameter.ssl_route_zone_id.value
  cdn_zone_id   = module.cdn.cdn_zone_id
}

resource "aws_ssm_parameter" "cdn_domain_name" {
  name  = module.names.cdn_domain_name
  type  = "String"
  value = module.cdn.domain_name
}

resource "aws_ssm_parameter" "host_bucket_id" {
  name  = module.names.host_bucket_id
  type  = "String"
  value = module.s3.bucket_id
}

resource "aws_ssm_parameter" "cloudfront_distribution_id" {
  name  = module.names.cloudfront_distribution_id
  type  = "String"
  value = module.cdn.distribution_id
}

resource "aws_ssm_parameter" "log_source_name" {
  name  = module.names.log_source_name
  type  = "String"
  value = module.cdn.log_source_name
}
