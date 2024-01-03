output "zone_id" {
    value = aws_cloudfront_distribution.sherlihyDotCom-stage-ami.hosted_zone_id
}

output "domain_name" {
    value = aws_cloudfront_distribution.sherlihyDotCom-stage-ami.domain_name
}
