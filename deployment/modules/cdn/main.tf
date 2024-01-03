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
    sherlihyDotCom_stage-origin_id = "sherlihyDotComStage-originId"
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
    origin_id                = local.sherlihyDotCom_stage-origin_id

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

          aliases = [var.domain_name]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.sherlihyDotCom_stage-origin_id

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
        #acm_certificate_arn = aws_acm_certificate.sherlihyDotCom-cdnCert.arn
    acm_certificate_arn = var.cert_arn
    #cloudfront_default_certificate = true
    cloudfront_default_certificate = false
    
    ssl_support_method = "sni-only"
  }
}

