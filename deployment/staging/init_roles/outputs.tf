output "profile" {
  value = local.profile
}

output "profile_arn" {
  value = data.aws_iam_user.stage_admin.arn
}

output "bucket_create_arn" {
    value = module.bucket_roles.bucket_create_arn
}

output "obj_replace_arn" {
    value = module.bucket_roles.obj_replace_arn
}

output "obj_replace_name" {
    value = module.bucket_roles.obj_replace_name
}
