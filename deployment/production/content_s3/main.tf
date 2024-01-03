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
