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
    profile = var.user_name

    assume_role {
        role_arn = var.obj_replace_arn
    }
}

module "upload" {
    source = "../../../modules/upload_s3"

    dist_path = "../../../../dist"
    dist_files = var.dist_files
    bucket_id = var.bucket_id

    resource_tags = var.resource_tags
}
