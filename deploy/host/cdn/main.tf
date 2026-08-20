terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

resource "aws_ssm_parameter" "cloudfront_distribution_id" {
  name  = "/sherlihy/cdn/distribution_id"
  type  = "String"
  value = aws_cloudfront_distribution.s3_distribution.id
}

resource "aws_ssm_parameter" "log_source_name" {
  name  = "/sherlihy/cdn/log_source_name"
  type  = "String"
  value = aws_cloudwatch_log_delivery_source.website_cdn.name
}

variable "uuid" {
  type = string
}

variable "bucket_id" {
    type = string
}

variable "bucket_arn" {
    type = string
}

variable "bucket_regional_domain_name" {
    type = string
}

variable "domain_name" {
    type = string
}

variable "cert_arn" {
    type = string
}

variable "validation_record_fqdns" {
  type = list(string)
}

locals {
    disabled_cache = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
}

resource "aws_acm_certificate_validation" "ssl" {
  certificate_arn         = var.cert_arn
  validation_record_fqdns = var.validation_record_fqdns
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = var.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.website.id
    origin_id                = var.uuid
  }

  aliases = [
    var.domain_name
  ]

  enabled             = true
  is_ipv6_enabled     = true

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate_validation.ssl.certificate_arn
    ssl_support_method = "sni-only"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.uuid

    viewer_protocol_policy = "redirect-to-https"

    cache_policy_id = local.disabled_cache
  }

  price_class = "PriceClass_100"

    default_root_object = "index.html"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }
}

resource "aws_cloudfront_origin_access_control" "website" {
  name                              = "website"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_s3_bucket_policy" "cloudfront_access" {
  bucket = var.bucket_id
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
      "${var.bucket_arn}/*"
    ]

    
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"

      values = [
        aws_cloudfront_distribution.s3_distribution.arn
      ]
    }
  }
}

resource "aws_cloudwatch_log_delivery_source" "website_cdn" {
  region = data.aws_region.current.region

  name         = "website_cdn"
  log_type     = "ACCESS_LOGS"
  resource_arn = aws_cloudfront_distribution.s3_distribution.arn
}

output "cdn_zone_id" {
    value = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
}

output "domain_name" {
    value = aws_cloudfront_distribution.s3_distribution.domain_name
}
