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
        role_arn = var.bucket_create_arn
    }
}

locals {
    except_tags = [for k,v in var.resource_tags : v]
}

#Here so its regionally bound and not global
module "s3_bucket" {
    source = "../../modules/s3_bucket"

    bucket_prefix = "sherlihydotcom-stage"

    bucket_create_arn = var.bucket_create_arn

    obj_replace_arn = var.obj_replace_arn

    resource_tags = var.resource_tags
}

module "obj_replace" {
    source = "../../modules/role_attachments/s3_upload"

    role_name = var.obj_replace_name

    bucket_name = module.s3_bucket.bucket_id
}
