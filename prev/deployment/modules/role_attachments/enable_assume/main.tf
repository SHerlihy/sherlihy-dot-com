variable "role_name" {
    type = string
}

data "aws_iam_policy_document" "enable_assume" {
  statement {
    effect = "Allow"
    actions = [
      "iam:*",
      "sts:GetCallerIdentity",
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "enable_assume" {
    policy = data.aws_iam_policy_document.enable_assume.json
}

resource "aws_iam_role_policy_attachment" "enable_assume" {
    role = var.role_name
    policy_arn = aws_iam_policy.enable_assume.arn
}
