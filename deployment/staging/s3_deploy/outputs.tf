output "bucket_id" {
    value = aws_s3_bucket.sherlihy_dot_com-stage.id
}

output "bucket_domain_name" {
  value = aws_s3_bucket.sherlihy_dot_com-stage.bucket_domain_name
}

output "zone_id" {
  value = aws_s3_bucket.sherlihy_dot_com-stage.hosted_zone_id
}

output "web_domain" {
    value = aws_s3_bucket_website_configuration.sherlihy_dot_com-stage.website_domain
}
