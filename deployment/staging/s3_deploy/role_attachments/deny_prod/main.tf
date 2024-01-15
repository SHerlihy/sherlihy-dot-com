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
    policy = data.aws_iam_policy_document.deny_prod.json
}

resource "aws_iam_role_policy_attachment" "deny_prod" {
    role = var.role_name
    policy_arn = aws_iam_policy.deny_prod.arn
}
