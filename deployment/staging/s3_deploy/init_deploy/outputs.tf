output "resource_tags" {
  value = local.resource_tags
}

output "profile" {
  value = local.profile
}

output "role_arn" {
    value = aws_iam_role.deploy_s3.arn
}
