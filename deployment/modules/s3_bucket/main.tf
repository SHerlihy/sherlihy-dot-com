terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

resource "aws_s3_bucket" "sherlihy_dot_com" {
  bucket_prefix = var.bucket_prefix

    tags = var.resource_tags
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

data "aws_iam_policy_document" "sherlihy_dot_com" {
    statement {
        effect = "Allow"
        principals {
            type = "*"
            identifiers = ["*"]
        }

        actions = [
            "s3:Get*",
            "s3:List*",
        ]

        resources = [
            aws_s3_bucket.sherlihy_dot_com.arn,
            "${aws_s3_bucket.sherlihy_dot_com.arn}/*",
        ]
    }

    statement {
        effect = "Deny"

        condition {
            variable = "aws:principalArn"
            test = "StringNotEquals"
            values = [
                var.bucket_create_arn
            ]
        }

        principals {
            type = "*"
            identifiers = ["*"]
        }

        actions = [
            "s3:Delete*",
            "s3:Put*",
        ]

        resources = [
            aws_s3_bucket.sherlihy_dot_com.arn
        ]
    }

    statement {
        effect = "Deny"

        condition {
            variable = "aws:principalArn"
            test = "StringNotEquals"
            values = [
                var.bucket_create_arn,
                var.obj_replace_arn
            ]
        }

        principals {
            type = "*"
            identifiers = ["*"]
        }

        actions = [
            "s3:Delete*",
            "s3:Put*",
        ]

        resources = [
            "${aws_s3_bucket.sherlihy_dot_com.arn}/*"
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
