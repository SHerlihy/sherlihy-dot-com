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
  region = "us-east-1"
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

data "aws_iam_policy_document" "all_s3" {
    statement {
        effect = "Allow"
        actions = [
            "*"
            #            "servicecatalog:*",
            #            "s3:*"
        ]
        resources = ["*"]
        #
        #        condition {
        #            variable = "s3:resourceTag"
        #            test = "StringEquals"
        #            values = [local.resource_tags.project]
        #        }
        #
        #        condition {
        #            variable = "s3:resourceTag"
        #            test = "StringEquals"
        #            values = [local.resource_tags.env]
        #        }
    }
}

resource "aws_iam_policy" "all_s3" {
    name = "sherlihyDotCom-staging-all"
    policy = data.aws_iam_policy_document.all_s3.json
}

resource "aws_iam_user_policy_attachment" "s3_all" {
    user = data.aws_iam_user.stage_admin.user_name
    policy_arn = aws_iam_policy.all_s3.arn
}
