output "profile" {
    value = local.profile
}

output "role_arn" {
    value = aws_iam_role.s3_upload.arn
}
