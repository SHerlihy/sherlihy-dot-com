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
  region = "eu-west-2"
    profile = var.profile

    assume_role {
        role_arn = var.role_arn
    }
}

#Here so its regionally bound and not global

module "s3_bucket" {
    source = "../../../modules/s3_bucket"
    
    profile_arn = var.profile_arn

    role_arn = var.role_arn

    bucket_prefix = "sherlihydotcom-stage"

    resource_tags = var.resource_tags
}
