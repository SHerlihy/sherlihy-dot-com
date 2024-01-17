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
    #profile = "sherlihyDotCom-staging-replace"
    profile = "sherlihyDotCom-staging"
}

locals {
  resource_tags = {
    project = "sherlihyDotCom"
    env     = "staging"
  }

    except_tags = [for k,v in local.resource_tags : v]
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

module "enable_assume" {
    source = "../role_attachments/enable_assume"

    role_name = aws_iam_role.s3_upload.name
}

module "s3_upload" {
    source = "../role_attachments/s3_upload"

    role_name = aws_iam_role.s3_upload.name

    resource_tags = local.except_tags
}

module "except_tags" {
    source = "../role_attachments/except_tags"

    role_name = aws_iam_role.s3_upload.name

    except_tags = local.except_tags
}
