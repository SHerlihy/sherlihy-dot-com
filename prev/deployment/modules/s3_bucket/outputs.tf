output "bucket_id" {
    value = aws_s3_bucket.sherlihy_dot_com.id
}

output "domain_name" {
  value = aws_s3_bucket.sherlihy_dot_com.bucket_regional_domain_name
}

output "zone_id" {
  value = aws_s3_bucket.sherlihy_dot_com.hosted_zone_id
}

output "web_domain" {
    value = aws_s3_bucket_website_configuration.sherlihy_dot_com.website_domain
}

output "web_endpoint" {
    value = aws_s3_bucket_website_configuration.sherlihy_dot_com.website_endpoint
}
