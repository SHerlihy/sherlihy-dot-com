data "aws_iam_user" "stage_admin" {
  user_name = var.profile
}

data "aws_iam_policy_document" "deploy_s3" {
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

   # condition {
   #   variable = "s3:resourceTag"
   #   test     = "ForAnyValue:StringEquals"
   #   values   = [local.resource_tags.project]
   # }

   # condition {
   #   variable = "s3:resourceTag"
   #   test     = "ForAnyValue:StringEquals"
   #   values   = [local.resource_tags.env]
   # }
  }
}

resource "aws_iam_policy" "deploy_s3" {
    policy = data.aws_iam_policy_document.deploy_s3.json
}

resource "aws_iam_role_policy_attachment" "deploy_s3" {
    role = var.role_name
    policy_arn = aws_iam_policy.deploy_s3.arn
}
