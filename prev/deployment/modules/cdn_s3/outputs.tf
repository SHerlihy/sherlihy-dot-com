output "zone_id" {
    value = aws_cloudfront_distribution.sherlihyDotCom-cdnS3.hosted_zone_id
}

output "domain_name" {
    value = aws_cloudfront_distribution.sherlihyDotCom-cdnS3.domain_name
}
