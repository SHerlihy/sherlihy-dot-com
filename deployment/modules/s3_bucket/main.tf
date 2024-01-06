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

resource "aws_s3_bucket" "sherlihy_dot_com" {
  bucket_prefix = var.bucket_prefix
}

resource "aws_s3_bucket_ownership_controls" "sherlihy_dot_com" {
  bucket = aws_s3_bucket.sherlihy_dot_com.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "sherlihy_dot_com" {
  bucket = aws_s3_bucket.sherlihy_dot_com.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "sherlihy_dot_com" {
  depends_on = [
    aws_s3_bucket_ownership_controls.sherlihy_dot_com,
    aws_s3_bucket_public_access_block.sherlihy_dot_com,
  ]

  bucket = aws_s3_bucket.sherlihy_dot_com.id
  acl    = "public-read"
}

// really I want to assume a role that allows me to upload to the bucket
data "aws_iam_policy_document" "sherlihy_dot_com" {
    statement {
        principals {
            type = "*"
            identifiers = ["*"]
        }

        actions = [
            "s3:*",
        ]

        resources = [
            aws_s3_bucket.sherlihy_dot_com.arn,
            "${aws_s3_bucket.sherlihy_dot_com.arn}/*",
        ]
    }
}

resource "aws_s3_bucket_policy" "sherlihy_dot_com" {
  bucket = aws_s3_bucket_public_access_block.sherlihy_dot_com.id

    policy = data.aws_iam_policy_document.sherlihy_dot_com.json
}

resource "aws_s3_bucket_website_configuration" "sherlihy_dot_com" {
    depends_on = [
        aws_s3_bucket_policy.sherlihy_dot_com
    ]

  bucket = aws_s3_bucket.sherlihy_dot_com.id
  index_document {
    suffix = "index.html"
  }
}
