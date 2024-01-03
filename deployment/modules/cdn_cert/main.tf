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

variable "domain_name" {
    type = string
}

variable "content_public_dns" {
    type = string
}

locals {
    s3_origin_id = "sherlihyDotComStageAMI"
}

resource "aws_acm_certificate" "sherlihyDotCom-cdnCert" {
  domain_name       = var.domain_name
  validation_method = "DNS"
}

resource "aws_cloudfront_cache_policy" "sherlihyDotCom-stage-ami" {
    name = "sherlihyDotCom-stage-ami"

    min_ttl     = 1

      parameters_in_cache_key_and_forwarded_to_origin {
        cookies_config {
            cookie_behavior = "none"
        }

        headers_config {
            header_behavior = "none"
        }

        query_strings_config {
            query_string_behavior = "none"
        }
    }
}

resource "aws_cloudfront_distribution" "sherlihyDotCom-stage-ami" {
  origin {
    origin_id                = local.s3_origin_id

    custom_origin_config {
        http_port = 80
        https_port = 443
        #origin_protocol_policy = "match-viewer"
        origin_protocol_policy = "http-only"
        origin_ssl_protocols = ["TLSv1"]
    }

    domain_name              = var.content_public_dns

  }

  enabled             = true

          aliases = ["stagestaging.click"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

        cache_policy_id = aws_cloudfront_cache_policy.sherlihyDotCom-stage-ami.id

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

      price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.sherlihyDotCom-cdnCert.arn
    #cloudfront_default_certificate = true
    cloudfront_default_certificate = false
    
    ssl_support_method = "sni-only"
  }
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

resource "aws_acm_certificate_validation" "sherlihyDotCom-stage-ami" {
  certificate_arn         = aws_acm_certificate.sherlihyDotCom-cdnCert.arn
  validation_record_fqdns = [for record in aws_route53_record.sherlihyDotCom-stage-ami-certRecs : record.fqdn]
}

resource "aws_route53_record" "sherlihyDotCom-stage-ami" {
  zone_id = data.aws_route53_zone.sherlihyDotCom-stage-ami.zone_id
  name    = var.domain_name
  type    = "A"

  alias {

    name = aws_cloudfront_distribution.sherlihyDotCom-stage-ami.domain_name
    zone_id = aws_cloudfront_distribution.sherlihyDotCom-stage-ami.hosted_zone_id
    evaluate_target_health = true
  }
}
