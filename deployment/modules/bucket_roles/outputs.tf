output "bucket_create_arn" {
    value = aws_iam_role.bucket_create.arn
}

output "obj_replace_arn" {
    value = aws_iam_role.obj_replace.arn
}

output "obj_replace_name" {
    value = aws_iam_role.obj_replace.name
}
