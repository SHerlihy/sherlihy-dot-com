output "bucket_id" {
    value = module.s3_bucket.bucket_id
}

output "web_domain" {
    value = module.s3_bucket.web_domain
}

output "web_endpoint" {
    value = module.s3_bucket.web_endpoint
}

output "resource_tags" {
    value = local.resource_tags
}
