terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket = "state-bucket-82f5696f9e0c0e51a2e8769e08"
    key    = "upload/terraform.tfstate"
    region = "eu-west-2"
  }
}

module "names" {
  source = "../names"
}

data "aws_ssm_parameter" "host_bucket_id" {
  region = "eu-west-2"
  name = module.names.host_bucket_id
}

locals {
  mime_types = {
    "html" = "text/html"
    "css"  = "text/css"
    "js"   = "application/javascript"
    "png"  = "image/png"
    "jpg"  = "image/jpeg"
    "gif"  = "image/gif"
  }
}

resource "terraform_data" "replacement" {
  input = timestamp()
}

resource "aws_s3_object" "website" {
  for_each = fileset("${path.module}/website", "**/*")

  bucket = data.aws_ssm_parameter.host_bucket_id.value
  key    = each.value
  source = "${path.module}/website/${each.value}"
  source_hash = filemd5("${path.module}/website/${each.value}")

  content_type = lookup(local.mime_types, split(".", each.value)[length(split(".", each.value)) - 1], "application/octet-stream")


   lifecycle {
      replace_triggered_by = [terraform_data.replacement]
   }
}
