terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

locals {
  resource_tags = {
    project = "sherlihyDotCom"
    env     = "production"
  }
}

module "s3_bucket" {
    source = "./s3_bucket"
}

resource "aws_acm_certificate" "sherlihyDotCom-cdnCert" {
  domain_name       = var.domain_name
  validation_method = "DNS"
}

module "cdn_s3" {
    source = "../modules/cdn_s3"
    
    alias_domain_name = var.domain_name

    origin_id = "sherlihyDotCom-prod-s3"

    bucket_domain_name = var.bucket_domain_name

    cert_arn = aws_acm_certificate.sherlihyDotCom-cdnCert.arn

    resource_tags = local.resource_tags
}

variable "bucket_domain_name" {
    type = string
}

data "aws_route53_zone" "sherlihyDotCom-prod" {
  name         = var.domain_name
  private_zone = false
}

resource "aws_route53_record" "sherlihyDotCom-prod-certRecs" {
  for_each = {
    for dvo in aws_acm_certificate.sherlihyDotCom-cdnCert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.sherlihyDotCom-prod.zone_id
}

resource "aws_route53_record" "sherlihyDotCom-prod-s3" {
  zone_id = data.aws_route53_zone.sherlihyDotCom-prod.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name = module.cdn_s3.domain_name
    zone_id = module.cdn_s3.zone_id 
    evaluate_target_health = true
  }
}

resource "aws_acm_certificate_validation" "sherlihydotcom-prod" {
  certificate_arn         = aws_acm_certificate.sherlihyDotCom-cdnCert.arn
  validation_record_fqdns = [for record in aws_route53_record.sherlihyDotCom-prod-certRecs : record.fqdn]
}
