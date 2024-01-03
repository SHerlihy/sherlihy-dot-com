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
  cost_tags = tomap({
    project = "sherlihyDotCom"
    env     = "staging"
  })
}

module "content_instance" {
    source = "./server_instance"

    pub_key_path = "./.ssh/id_rsa.pub"

    config_script_path = "../../configuration_scripts/web_server-init.sh"

    resource_tags = local.cost_tags
}

resource "aws_acm_certificate" "sherlihyDotCom-cdnCert" {
  domain_name       = var.domain_name
  validation_method = "DNS"
}

module "cdn" {
    source = "../../modules/cdn"
    
    domain_name = var.domain_name

    content_public_dns = module.content_instance.public_dns

    cert_arn = aws_acm_certificate.sherlihyDotCom-cdnCert.arn

    resource_tags = local.cost_tags
}

data "aws_route53_zone" "sherlihyDotCom-stage-ami" {
  name         = var.domain_name
  private_zone = false
}

resource "aws_route53_record" "sherlihyDotCom-stage-ami-certRecs" {
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
  zone_id         = data.aws_route53_zone.sherlihyDotCom-stage-ami.zone_id
}

resource "aws_route53_record" "sherlihyDotCom-stage-ami" {
  zone_id = data.aws_route53_zone.sherlihyDotCom-stage-ami.zone_id
  name    = var.domain_name
  type    = "A"

  alias {

    name = module.cdn.domain_name
    zone_id = module.cdn.zone_id 
    evaluate_target_health = true
  }
}

resource "aws_acm_certificate_validation" "sherlihyDotCom-stage-ami" {
  certificate_arn         = aws_acm_certificate.sherlihyDotCom-cdnCert.arn
  validation_record_fqdns = [for record in aws_route53_record.sherlihyDotCom-stage-ami-certRecs : record.fqdn]
}
