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
}

data "aws_caller_identity" "prod_admin" {}

module "bucket_roles" {
    source = "../../../modules/bucket_roles"

    user_arn = data.aws_caller_identity.prod_admin.arn
}
