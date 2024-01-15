data "aws_iam_user" "stage_admin" {
  user_name = var.profile
}

data "aws_iam_policy_document" "deny_prod" {
  statement {
    effect = "Deny"
    actions = [
        "*",
    ]
    resources = ["*"]

    condition {
      variable = "*:resourceTag"
      test     = "ForAnyValue:StringEquals"
      values   = [var.prod_tag]
    }
  }
}

resource "aws_iam_policy" "deny_prod" {
  name_prefix   = "sherlihyDotCom-staging-deny-prod"
  policy = data.aws_iam_policy_document.deny_prod.json
}

resource "aws_iam_user_policy_attachment" "deny_prod" {
  user       = data.aws_iam_user.stage_admin.user_name
  policy_arn = aws_iam_policy.deny_prod.arn
}
