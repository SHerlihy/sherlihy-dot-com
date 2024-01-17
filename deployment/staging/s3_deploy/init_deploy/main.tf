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

    except_tags = [for k,v in local.resource_tags : v]
}

data "aws_iam_user" "stage_admin" {
  user_name = local.profile
}

data "aws_iam_policy_document" "assume_role" {
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

resource "aws_iam_role" "bucket_create" {
    assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

module "enable_assume" {
    source = "../role_attachments/enable_assume"

    role_name = aws_iam_role.bucket_create.name
}

module "create_s3" {
    source = "../role_attachments/create_bucket"

    role_name = aws_iam_role.bucket_create.name

    profile = local.profile
}

module "except_tags" {
    source = "../role_attachments/except_tags"

    role_name = aws_iam_role.bucket_create.name

    except_tags = local.except_tags
}

resource "aws_iam_role" "obj_replace" {
    assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

module "enable_assume" {
    source = "../role_attachments/enable_assume"

    role_name = aws_iam_role.obj_replace.name
}

module "obj_replace" {
    source = "../role_attachments/s3_upload"

    role_name = aws_iam_role.obj_replace.name

    resource_tags = local.except_tags
}

module "except_tags" {
    source = "../role_attachments/except_tags"

    role_name = aws_iam_role.obj_replace.name

    except_tags = local.except_tags
}
