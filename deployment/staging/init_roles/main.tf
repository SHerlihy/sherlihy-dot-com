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

data "aws_iam_user" "stage_admin" {
  user_name = local.profile
}

module "bucket_roles" {
    source = "../../modules/bucket_roles"

    user_arn = data.aws_iam_user.stage_admin.arn
}
