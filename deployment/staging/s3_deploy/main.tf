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
  region = "eu-west-2"
}

resource "aws_s3_bucket" "sherlihy_dot_com-stage" {
  bucket_prefix = "sherlihydotcom-stage"
}

resource "aws_s3_bucket_ownership_controls" "sherlihy_dot_com-stage" {
  bucket = aws_s3_bucket.sherlihy_dot_com-stage.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "sherlihy_dot_com-stage" {
  bucket = aws_s3_bucket.sherlihy_dot_com-stage.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "sherlihy_dot_com-stage" {
  depends_on = [
    aws_s3_bucket_ownership_controls.sherlihy_dot_com-stage,
    aws_s3_bucket_public_access_block.sherlihy_dot_com-stage,
  ]

  bucket = aws_s3_bucket.sherlihy_dot_com-stage.id
  acl    = "public-read"
}

// really I want to assume a role that allows me to upload to the bucket
data "aws_iam_policy_document" "sherlihy_dot_com-stage" {
    statement {
        principals {
            type = "*"
            identifiers = ["*"]
        }

        actions = [
            "s3:*",
        ]

        resources = [
            aws_s3_bucket.sherlihy_dot_com-stage.arn,
            "${aws_s3_bucket.sherlihy_dot_com-stage.arn}/*",
        ]
    }
}

resource "aws_s3_bucket_policy" "sherlihy_dot_com-stage" {
  bucket = aws_s3_bucket_public_access_block.sherlihy_dot_com-stage.id
  #policy = templatefile("s3-policy.json", { bucket = var.bucketName })

    policy = data.aws_iam_policy_document.sherlihy_dot_com-stage.json
}

resource "aws_s3_bucket_website_configuration" "sherlihy_dot_com-stage" {
    depends_on = [
        aws_s3_bucket_policy.sherlihy_dot_com-stage
    ]

  bucket = aws_s3_bucket.sherlihy_dot_com-stage.id
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_object" "dist-to-objects" {
    depends_on = [
        aws_s3_bucket_policy.sherlihy_dot_com-stage
    ]

  count = length(var.dist_files)

  bucket = aws_s3_bucket.sherlihy_dot_com-stage.id
  key    = var.dist_files[count.index].path
  source = "../../../dist/${var.dist_files[count.index].path}"

  acl = "public-read"

    content_type = var.dist_files[count.index].type
}

output "bucket_doamin_name" {
  value = aws_s3_bucket.sherlihy_dot_com-stage.bucket_domain_name
}

output "zone_id" {
  value = aws_s3_bucket.sherlihy_dot_com-stage.hosted_zone_id
}

output "web_domain" {
    value = aws_s3_bucket_website_configuration.sherlihy_dot_com-stage.website_domain
}
//
//locals {
//    s3_origin_id = "stageS3SherlihyDotCom"
//}
//
//resource "aws_cloudfront_cache_policy" "sherlihydotcom-stage" {
//    name = "sherlihydotcom-stage"
//
//    min_ttl     = 1
//
//      parameters_in_cache_key_and_forwarded_to_origin {
//        cookies_config {
//            cookie_behavior = "none"
//        }
//
//        headers_config {
//            header_behavior = "none"
//        }
//
//        query_strings_config {
//            query_string_behavior = "none"
//        }
//    }
//}
//
//resource "aws_cloudfront_distribution" "sherlihydotcom-stage" {
//  origin {
//    domain_name              = aws_s3_bucket.sherlihy_dot_com-stage.bucket_regional_domain_name
//    origin_id                = local.s3_origin_id
//  }
//
//  enabled             = true
//  default_root_object = "index.html"
//
//      # aliases = ["mysite.example.com", "yoursite.example.com"]
//
//  default_cache_behavior {
//    allowed_methods  = ["GET", "HEAD"]
//    cached_methods   = ["GET", "HEAD"]
//    target_origin_id = local.s3_origin_id
//
//        cache_policy_id = aws_cloudfront_cache_policy.sherlihydotcom-stage.id
//
//    viewer_protocol_policy = "allow-all"
//    min_ttl                = 0
//    default_ttl            = 3600
//    max_ttl                = 86400
//  }
//
//      price_class = "PriceClass_100"
//
//  restrictions {
//    geo_restriction {
//      restriction_type = "none"
//      locations        = []
//    }
//  }
//
//  viewer_certificate {
//    cloudfront_default_certificate = true
//  }
//}
//
//output "domain_name-CDN" {
//    value = aws_cloudfront_distribution.sherlihydotcom-stage.domain_name
//}
//
//output "hosted_zone_id-CDN" {
//    value = aws_cloudfront_distribution.sherlihydotcom-stage.hosted_zone_id
//}
