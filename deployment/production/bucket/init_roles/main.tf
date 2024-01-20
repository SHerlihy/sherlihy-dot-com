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
  profile = var.user_name

    assume_role {
        role_arn = var.init_role_arn
    }
}

data "aws_iam_user" "current" {
    user_name = var.user_name
}

module "bucket_roles" {
    source = "../../../modules/bucket_roles"

    user_arn = data.aws_iam_user.current.arn 
}
