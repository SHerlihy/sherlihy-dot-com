output "domain_name" {
    value = aws_cloudfront_distribution.sherlihydotcom-prod.domain_name
}

output "zone_id" {
    value = aws_cloudfront_distribution.sherlihydotcom-prod.hosted_zone_id
}
