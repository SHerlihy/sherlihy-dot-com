output "resource_tags" {
  value = local.resource_tags
}

output "profile" {
  value = local.profile
}

output "profile_arn" {
  value = data.aws_iam_user.stage_admin.arn
}

output "bucket_create_arn" {
    value = aws_iam_role.bucket_create.arn
}

output "obj_replace_arn" {
    value = aws_iam_role.obj_replace.arn
}

output "obj_replace_name" {
    value = aws_iam_role.obj_replace.name
}
