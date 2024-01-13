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
    profile = "iam_admin"
}

data "aws_iam_user" "iam_admin" {
  user_name = "iam_admin"
}

data "aws_iam_policy_document" "all_s3" {
    statement {
        effect = "Allow"
        actions = [
            "s3:*",
            "servicecatalog:*"
        ]
        resources = ["*"]
    }
}

resource "aws_iam_policy" "all_s3" {
    policy = data.aws_iam_policy_document.all_s3.json
}

resource "aws_iam_user_policy_attachment" "s3_all" {
    user = data.aws_iam_user.iam_admin.user_name
    policy_arn = aws_iam_policy.all_s3.arn
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

data "aws_iam_policy_document" "bucket-access" {
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

    policy = data.aws_iam_policy_document.bucket-access.json
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
