terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "us-east-1"
  profile = var.user_name

    assume_role {
        role_arn = var.init_role_arn
    }
}

data "aws_iam_user" "current" {
    user_name = var.user_name
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
                data.aws_iam_user.current.arn
            ]
        }
    }
}

resource "aws_iam_role" "distribute_create" {
    assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

module "enable_assume" {
    source = "../../../modules/role_attachments/enable_assume"

    role_name = aws_iam_role.distribute_create.name
}

data "aws_iam_policy_document" "deploy_acm" {
  statement {
    effect = "Allow"
    actions = [
        "acm:*"
    ]
    resources = [
        "arn:aws:acm:*"
        ]
  }
}

resource "aws_iam_policy" "deploy_acm" {
    policy = data.aws_iam_policy_document.deploy_acm.json
}

resource "aws_iam_role_policy_attachment" "deploy_acm" {
    role = aws_iam_role.distribute_create.id
    policy_arn = aws_iam_policy.deploy_acm.arn
}

data "aws_iam_policy_document" "deploy_cdn" {
  statement {
    effect = "Allow"
    actions = [
        "cloudfront:*"
    ]
    resources = [
        "arn:aws:cloudfront::*"
        ]
  }
}

resource "aws_iam_policy" "deploy_cdn" {
    policy = data.aws_iam_policy_document.deploy_cdn.json
}

resource "aws_iam_role_policy_attachment" "deploy_cdn" {
    role = aws_iam_role.distribute_create.id
    policy_arn = aws_iam_policy.deploy_cdn.arn
}

data "aws_iam_policy_document" "deploy_r53" {
  statement {
    effect = "Allow"
    actions = [
        "route53:*",
        "route53domains:*",
        "route53resolver:*"
    ]
    resources = [
        #all due to domains
        "*"
        #"arn:aws:route53:::*",
        ]
  }
}

resource "aws_iam_policy" "deploy_r53" {
    policy = data.aws_iam_policy_document.deploy_r53.json
}

resource "aws_iam_role_policy_attachment" "deploy_r53" {
    role = aws_iam_role.distribute_create.id
    policy_arn = aws_iam_policy.deploy_r53.arn
}
