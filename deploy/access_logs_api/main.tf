terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.7"
    }
  }

  backend "s3" {
    bucket = "state-bucket-82f5696f9e0c0e51a2e8769e08"
    key    = "access_logs_api/terraform.tfstate"
    region = "eu-west-2"
  }
}

provider "aws" {
  profile = "sherlihydtcom"
  region = "us-east-1"
}

module "cloudwatch" {
  source = "./log_group"
}

module "stream" {
  source = "./stream"

  log_group_arn = module.cloudwatch.log_group_arn
}

output "access_logs_stream_url" {
  value = module.stream.endpoint
}
