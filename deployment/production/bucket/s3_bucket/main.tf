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

    assume_role {
        role_arn = var.bucket_create_arn
    }
}

locals {
    resource_tags = {
        project = "sherlihyDotCom"
        env = "production"
    }
}

#Here so its regionally bound and not global
module "s3_bucket" {
    source = "../../../modules/s3_bucket"

    bucket_prefix = "sherlihydotcom-prod"

    bucket_create_arn = var.bucket_create_arn

    obj_replace_arn = var.obj_replace_arn

    resource_tags = local.resource_tags
}

module "obj_replace" {
    source = "../../../modules/role_attachments/s3_upload"

    role_name = var.obj_replace_name

    bucket_name = module.s3_bucket.bucket_id
}
