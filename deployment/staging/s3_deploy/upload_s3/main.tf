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

locals {
  cost_tags = tomap({
    project = "sherlihyDotCom"
    env     = "staging"
  })
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

module "upload" {
    source = "../../../modules/upload_s3"

    dist_path = "../../../../dist"
    dist_files = var.dist_files
    bucket_id = var.bucket_id
}
