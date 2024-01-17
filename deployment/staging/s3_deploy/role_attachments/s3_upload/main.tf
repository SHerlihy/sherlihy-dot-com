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
    resources = ["*"]

   condition {
     variable = "s3:resourceTag"
     test     = "ForAllValues:StringEquals"
     values   = var.resource_tags
   }
  }
}

resource "aws_iam_policy" "s3_upload" {
    policy = data.aws_iam_policy_document.s3_upload.json
}

resource "aws_iam_role_policy_attachment" "s3_upload" {
    role = var.role_name
    policy_arn = aws_iam_policy.s3_upload.arn
}
