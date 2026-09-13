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
  region  = "us-east-1"
}

locals {
  api_name = "live-logs"
  path_to_settings = {
    "*/*" : {
      burst_limit = 2
      rate_limit  = 1
    }
  }

  quota = {
    limit : 100
    period : "MONTH"
  }
  throttle = {
    burst : 2
    rate : 1
  }
}

module "draft_api" {
  source  = "SHerlihy/draft-cors-api/aws"
  version = "0.0.2"

  api_name = local.api_name
  tags     = {}
}

module "cloudwatch" {
  source = "./log_group"
}

module "stream" {
  source = "./lambda"

  api_id           = module.draft_api.api_id
  root_resource_id = module.draft_api.root_resource_id
  execution_arn    = module.draft_api.execution_arn

  log_group_arn = module.cloudwatch.log_group_arn
}

module "deploy_api" {
  source  = "SHerlihy/deploy-api-public-quota/aws"
  version = "0.0.4"

  api_id     = module.draft_api.api_id
  stage_name = "prod"
  quota      = local.quota
  throttle   = local.throttle

  path_to_settings = local.path_to_settings

  tags = {}
}

output "access_logs_api_url" {
  value = module.deploy_api.endpoint
}

output "access_logs_api_key" {
  value = module.deploy_api.api_key
}
