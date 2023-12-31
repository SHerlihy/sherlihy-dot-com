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

resource "aws_s3_bucket" "sherlihyDotCom-stage" {
  bucket_prefix = "sherlihyDotCom-stage"
}

data "aws_iam_policy_document" "sherlihyDotCom-stage" {
    statement {
        principals {
            type = "*"
            identifiers = ["*"]
        }

        actions = [
            "s3:GetObject",
        ]

        resources = [
            "aws_s3_bucket.sherlihyDotCom-stage.id",
            "${aws_s3_bucket.sherlihyDotCom-stage.id}/*",
        ]
    }
}

resource "aws_s3_bucket_policy" "sherlihyDotCom-stage" {
  bucket = aws_s3_bucket.sherlihyDotCom-stage.id
  #policy = templatefile("s3-policy.json", { bucket = var.bucketName })

    policy = data.aws_iam_policy_document.sherlihyDotCom-stage.json
}

resource "aws_s3_bucket_website_configuration" "sherlihyDotCom-stage" {
  bucket = aws_s3_bucket.sherlihyDotCom-stage.bucket
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_object" "dist-to-objects" {
  count = length(var.dist_files)

  bucket = aws_s3_bucket.sherlihyDotCom-stage.id
  key    = var.dist_files[count.index]
  source = "../../dist/${var.dist_files[count.index]}"

  acl = "public-read"
}

output "bucket_doamin_name" {
  value = aws_s3_bucket.sherlihyDotCom-stage.bucket_domain_name
}

output "zone_id" {
  value = aws_s3_bucket.sherlihyDotCom-stage.hosted_zone_id
}
