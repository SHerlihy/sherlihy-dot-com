terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket = "state-bucket-82f5696f9e0c0e51a2e8769e08"
    key    = "ssl/terraform.tfstate"
    region = "eu-west-2"
  }
}

provider "aws" {
  profile = "sherlihydtcom"
}

variable "domain_name" {
    type = string
    default = "sherlihy.com"
}

module "names" {
  source = "../names"
}

resource "aws_acm_certificate" "cert" {
  domain_name       = var.domain_name
   validation_method = "DNS"
}

resource "aws_route53_zone" "sherlihyDotCom" {
    name         = var.domain_name
}

// add CNAME record to r53
resource "aws_route53_record" "ssl" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.sherlihyDotCom.zone_id
}

locals {
  fqdn_list = [for record in aws_route53_record.ssl : record.fqdn]
}

resource "aws_ssm_parameter" "cert_arn" {
  name  = module.names.ssl_cert_arn
  type  = "String"
  value = aws_acm_certificate.cert.arn
}

resource "aws_ssm_parameter" "validation_record_fqdns" {
  name  = module.names.ssl_validation_record_fqdns
  type  = "StringList"
  value = join(",", local.fqdn_list)
}

resource "aws_ssm_parameter" "route_zone_id" {
  name  = module.names.ssl_route_zone_id
  type  = "String"
  value = aws_route53_zone.sherlihyDotCom.zone_id
}

resource "aws_ssm_parameter" "name_servers" {
  name  = module.names.ssl_name_servers
  type  = "StringList"
  value = join(",", aws_route53_zone.sherlihyDotCom.name_servers)
}
