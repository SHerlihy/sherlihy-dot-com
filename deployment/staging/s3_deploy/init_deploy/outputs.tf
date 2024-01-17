output "resource_tags" {
  value = local.resource_tags
}

output "profile" {
  value = local.profile
}

output "profile_arn" {
  value = data.aws_iam_user.stage_admin.arn
}

output "role_arn" {
    value = aws_iam_role.deploy_s3.arn
}
