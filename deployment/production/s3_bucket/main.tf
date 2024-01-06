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
}

#Here so its regionally bound and not global

module "s3_bucket" {
    source = "../../modules/s3_bucket"

    bucket_prefix = "sherlihydotcom-prod"
}
