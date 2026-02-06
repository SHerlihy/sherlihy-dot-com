terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  profile = "sherlihydtcom"
}

locals {
    uuid = "02d01d33-622a-421d-93de-410f503a438e"
    domain_name = "sherlihy.com"
    project_name = "sherlihydtcom"
}

module "s3" {
  source = "./create_s3"

  project_name = local.project_name
}

module "cdn" {
  source = "./cdn"

  bucket_arn = module.s3.bucket_arn
  bucket_id = module.s3.bucket_id
  bucket_regional_domain_name = module.s3.bucket_regional_domain_name

  uuid = local.uuid
}

module "alias" {
  source = "./alias"

  domain_name = local.domain_name
  endpoint = module.cdn.domain_name
  zone_id = module.cdn.zone_id
}

output "cdn_domain_name" {
  value = module.cdn.domain_name
}

output "name_servers" {
  value = module.alias.name_servers
}

output "bucket_id" {
  value = module.s3.bucket_id
}
