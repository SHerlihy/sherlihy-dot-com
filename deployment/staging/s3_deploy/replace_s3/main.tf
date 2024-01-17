terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

locals {
    profile = "sherlihyDotCom-staging-replace"
}

provider "aws" {
  region  = "us-east-1"
  profile = local.profile
}

data "aws_iam_user" "replace_user" {
  user_name = local.profile
}

data "aws_iam_policy_document" "assume_s3_upload" {
    statement {
        effect = "Allow"
        actions = [
            "sts:AssumeRole",
        ]
        principals {
            type = "AWS"
            identifiers = [
                data.aws_iam_user.replace_user.arn
            ]

        }
    }
}

resource "aws_iam_role" "s3_upload" {
    name = "sherlihyDotCom-staging-s3Objects-replace"
    assume_role_policy = data.aws_iam_policy_document.assume_s3_upload.json
}

data "aws_iam_policy_document" "enable_assume" {
  statement {
    effect = "Allow"
    actions = [
      "iam:*",
      "sts:GetCallerIdentity",
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "enable_assume" {
    policy = data.aws_iam_policy_document.enable_assume.json
}

resource "aws_iam_role_policy_attachment" "enable_assume" {
    role = aws_iam_role.s3_upload.name
    policy_arn = aws_iam_policy.enable_assume.arn
}

#module "s3_upload" {
#    source = "../role_attachments/s3_upload"
#
#    role_name = aws_iam_role.s3_upload.name
#
#    resource_tags = var.resource_tags
#}

#module "deny_prod" {
#    source = "../role_attachments/deny_prod"
#
#    role_name = aws_iam_role.s3_upload.name
#}
#
