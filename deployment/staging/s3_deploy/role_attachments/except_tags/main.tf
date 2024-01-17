data "aws_iam_policy_document" "deny_except" {
  statement {
    effect = "Deny"
    actions = [
        "*",
    ]
    resources = ["*"]

    condition {
      variable = "*:resourceTag"
      test     = "ForAnyValue:StringNotEquals"
      values   = var.except_tags
    }
  }
}

resource "aws_iam_policy" "deny_except" {
    policy = data.aws_iam_policy_document.deny_except.json
}

resource "aws_iam_role_policy_attachment" "deny_except" {
    role = var.role_name
    policy_arn = aws_iam_policy.deny_except.arn
}
