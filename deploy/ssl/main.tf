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
    region = "us-east-1"
}

variable "domain_name" {
    type = string
    default = "sherlihy.com"
}

resource "aws_acm_certificate" "cert" {
  domain_name       = var.domain_name
   validation_method = "DNS"
}

resource "aws_route53_zone" "sherlihyDotCom" {
    name         = var.domain_name

    force_destroy = true
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

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.sherlihyDotCom.zone_id
}

output "cert_arn" {
  value = aws_acm_certificate.cert.arn
}

output "validation_record_fqdns" {
  value = [for record in aws_route53_record.ssl : record.fqdn]
}

output "route_zone_id" {
  value = aws_route53_zone.sherlihyDotCom.zone_id
}

// to put into DNS
output "name_servers" {
    value = aws_route53_zone.sherlihyDotCom.name_servers
}
