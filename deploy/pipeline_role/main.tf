terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket = "state-bucket-82f5696f9e0c0e51a2e8769e08"
    key    = "pipeline/terraform.tfstate"
    region = "eu-west-2"
  }
}

provider "aws" {
  profile = "sherlihydtcom"
}

data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github.certificates[0].sha1_fingerprint]
}

data "aws_iam_policy_document" "pipeline" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"

      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:SHerlihy/sherlihy-dot-com:ref:refs/heads/main"
      ]
    }
  }
}

resource "aws_iam_role" "pipeline" {
  name               = "pipeline"
  assume_role_policy = data.aws_iam_policy_document.pipeline.json
}

resource "aws_iam_policy" "s3_full_access" {
  name        = "github-actions-s3-full-access"
  description = "Grants full administrative access to all S3 buckets and actions"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "s3:*"
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_s3_full" {
  role       = aws_iam_role.pipeline.name
  policy_arn = aws_iam_policy.s3_full_access.arn
}

output "arn" {
  value = aws_iam_role.pipeline.arn
}
