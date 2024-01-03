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

resource "aws_cloudfront_cache_policy" "sherlihyDotCom-cdnS3" {
    name = "sherlihyDotCom-cdnS3"

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
resource "aws_cloudfront_origin_access_control" "sherlihyDotCom-cdnS3" {
  name                              = "sherlihyDotCom-cdnS3"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "sherlihyDotCom-cdnS3" {
  origin {
    domain_name              = var.bucket_domain_name
    origin_id                = var.origin_id

        custom_origin_config {
            http_port = 80
            https_port = 443

            origin_protocol_policy = "http-only"
            origin_ssl_protocols = ["TLSv1"]
        }
  }

  enabled             = true
  default_root_object = "index.html"

  aliases = [var.alias_domain_name]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.origin_id

        cache_policy_id = aws_cloudfront_cache_policy.sherlihyDotCom-cdnS3.id

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
    acm_certificate_arn = var.cert_arn
    cloudfront_default_certificate = false
    
    ssl_support_method = "sni-only"
  }
}
