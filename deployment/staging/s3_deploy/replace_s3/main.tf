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
  region  = "us-east-1"
  profile = var.profile
}

data "aws_iam_user" "stage_admin" {
  user_name = var.profile
}

data "aws_iam_policy_document" "assume_s3_upload" {
    statement {
        effect = "Allow"
        actions = [
            "sts:AssumeRole"
        ]
        principals {
            type = "AWS"
            identifiers = [
                data.aws_iam_user.stage_admin.arn
            ]

        }
    }
}

resource "aws_iam_role" "s3_upload" {
    assume_role_policy = data.aws_iam_policy_document.assume_s3_upload.json
}

module "s3_upload" {
    source = "../role_attachments/s3_upload"

    role_name = aws_iam_role.s3_upload.name

    resource_tags = var.resource_tags
}

module "deny_prod" {
    source = "../role_attachments/deny_prod"

    role_name = aws_iam_role.s3_upload.name
}
