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

resource "aws_s3_bucket" "sherlihy_dot_com-prod" {
  bucket_prefix = "sherlihydotcom-prod"
}

resource "aws_s3_bucket_ownership_controls" "sherlihy_dot_com-prod" {
  bucket = aws_s3_bucket.sherlihy_dot_com-prod.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "sherlihy_dot_com-prod" {
  bucket = aws_s3_bucket.sherlihy_dot_com-prod.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "sherlihy_dot_com-prod" {
  depends_on = [
    aws_s3_bucket_ownership_controls.sherlihy_dot_com-prod,
    aws_s3_bucket_public_access_block.sherlihy_dot_com-prod,
  ]

  bucket = aws_s3_bucket.sherlihy_dot_com-prod.id
  acl    = "public-read"
}

// really I want to assume a role that allows me to upload to the bucket
data "aws_iam_policy_document" "sherlihy_dot_com-prod" {
    statement {
        principals {
            type = "*"
            identifiers = ["*"]
        }

        actions = [
            "s3:*",
        ]

        resources = [
            aws_s3_bucket.sherlihy_dot_com-prod.arn,
            "${aws_s3_bucket.sherlihy_dot_com-prod.arn}/*",
        ]
    }
}

resource "aws_s3_bucket_policy" "sherlihy_dot_com-prod" {
  bucket = aws_s3_bucket_public_access_block.sherlihy_dot_com-prod.id
  #policy = templatefile("s3-policy.json", { bucket = var.bucketName })

    policy = data.aws_iam_policy_document.sherlihy_dot_com-prod.json
}

resource "aws_s3_bucket_website_configuration" "sherlihy_dot_com-prod" {
    depends_on = [
        aws_s3_bucket_policy.sherlihy_dot_com-prod
    ]

  bucket = aws_s3_bucket.sherlihy_dot_com-prod.id
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_object" "dist-to-objects" {
    depends_on = [
        aws_s3_bucket_policy.sherlihy_dot_com-prod,
        aws_s3_bucket_website_configuration.sherlihy_dot_com-prod
    ]

  count = length(var.dist_files)

  bucket = aws_s3_bucket.sherlihy_dot_com-prod.id
  key    = var.dist_files[count.index].path
  source = "${var.dist_dir_path}${var.dist_files[count.index].path}"

  acl = "public-read"

    content_type = var.dist_files[count.index].type
}

locals {
    s3_origin_id = "prodS3SherlihyDotCom"
}

resource "aws_cloudfront_cache_policy" "sherlihydotcom-prod" {
    name = "sherlihydotcom-prod"

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

resource "aws_cloudfront_distribution" "sherlihydotcom-prod" {
  origin {
    domain_name              = aws_s3_bucket.sherlihy_dot_com-prod.bucket_regional_domain_name
    origin_id                = local.s3_origin_id
  }

  enabled             = true
  default_root_object = "index.html"

          aliases = [var.domain_name]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

        cache_policy_id = aws_cloudfront_cache_policy.sherlihydotcom-prod.id

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
