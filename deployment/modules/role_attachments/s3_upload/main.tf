variable "role_name" {
    type = string
}

variable "bucket_name" {
    type = string
}

data "aws_iam_policy_document" "s3_upload" {
  statement {
    effect = "Allow"

    actions = [
      "s3:Create*",
      "s3:Delete*",
      "s3:Get*",
      "s3:List*",
      "s3:Put*",
    ]

    resources = ["arn:aws:s3:::${var.bucket_name}/*"]

  }

  statement {
    effect = "Deny"

#    condition {
#            variable = "s3:DataAccessPointArn"
#            test = "StringNotEqual"
#            values = ["arn:aws:s3:::${var.bucket_name}/*"]
#        }

    actions = [
            "s3:*",
        ]

    not_resources = ["arn:aws:s3:::${var.bucket_name}","arn:aws:s3:::${var.bucket_name}/*"]

  }
}

resource "aws_iam_policy" "s3_upload" {
    policy = data.aws_iam_policy_document.s3_upload.json
}

resource "aws_iam_role_policy_attachment" "s3_upload" {
    role = var.role_name
    policy_arn = aws_iam_policy.s3_upload.arn
}
