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
  profile = "sherlihyDotCom-staging"

    assume_role {
        role_arn = "arn:aws:iam::111644099040:role/sherlihyDotCom-staging-iam"
    }
}

data "aws_iam_user" "current" {
    user_name = "sherlihyDotCom-staging"
}

module "bucket_roles" {
    source = "../../modules/bucket_roles"

    user_arn = data.aws_iam_user.current.arn 
}
