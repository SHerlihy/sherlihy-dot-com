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

resource "aws_s3_object" "dist-to-objects" {
  count = length(var.dist_files)

  bucket = var.bucket_id
  key    = var.dist_files[count.index].path
source = "${var.dist_path}/${var.dist_files[count.index].path}"

  acl = "public-read"

    content_type = var.dist_files[count.index].type
}

