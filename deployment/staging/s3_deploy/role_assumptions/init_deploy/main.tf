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
  profile = "sherlihyDotCom-staging"
}

provider "aws" {
  region  = "us-east-1"
  profile = local.profile
}

locals {
  resource_tags = {
    project = "sherlihyDotCom"
    env     = "staging"
  }
}

data "aws_iam_user" "stage_admin" {
  user_name = local.profile
}

data "aws_iam_policy_document" "assume_deploy_s3" {
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

resource "aws_iam_role" "deploy_s3" {
    assume_role_policy = data.aws_iam_policy_document.assume_deploy_s3.json
}


data "aws_iam_policy_document" "deploy_s3" {
  statement {
    effect = "Allow"
    actions = [
      "iam:*",
      "sts:GetCallerIdentity",
      "s3:Create*",
      "s3:Delete*",
      "s3:Get*",
      "s3:List*",
      "s3:Put*",
    ]
    resources = ["*"]

   # condition {
   #   variable = "s3:resourceTag"
   #   test     = "ForAnyValue:StringEquals"
   #   values   = [local.resource_tags.project]
   # }

   # condition {
   #   variable = "s3:resourceTag"
   #   test     = "ForAnyValue:StringEquals"
   #   values   = [local.resource_tags.env]
   # }
  }
}

resource "aws_iam_policy" "deploy_s3" {
    policy = data.aws_iam_policy_document.deploy_s3.json
}

resource "aws_iam_role_policy_attachment" "deploy_s3" {
    role = aws_iam_role.deploy_s3.name
    policy_arn = aws_iam_policy.deploy_s3.arn
}
