variable "user_arn" {
    type = string
}

data "aws_iam_policy_document" "assume_role" {
    statement {
        effect = "Allow"
        actions = [
            "sts:AssumeRole"
        ]
        principals {
            type = "AWS"
            identifiers = [
                var.user_arn
            ]
        }
    }
}

resource "aws_iam_role" "bucket_create" {
    assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

module "create_enable_assume" {
    source = "../role_attachments/enable_assume"

    role_name = aws_iam_role.bucket_create.name
}

module "create_s3" {
    source = "../role_attachments/create_bucket"

    role_name = aws_iam_role.bucket_create.name
}

resource "aws_iam_role" "obj_replace" {
    assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

module "replace_enable_assume" {
    source = "../role_attachments/enable_assume"

    role_name = aws_iam_role.obj_replace.name
}
