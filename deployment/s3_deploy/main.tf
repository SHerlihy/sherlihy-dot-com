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
  key    = var.dist_files[count.index]
  source = "../../dist/${var.dist_files[count.index]}"

  acl = "public-read"

    content_type = "text/html"
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
