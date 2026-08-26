variable "source_name" {
  type = string
}

data "aws_caller_identity" "current" {}

resource "aws_s3_bucket" "user_access" {
  bucket_prefix = "user-access-"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "user_access" {
  bucket                  = aws_s3_bucket.user_access.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudwatch_log_delivery_destination" "user_access" {
  region        = "us-east-1"
  name          = "user_access-destination"
  output_format = "json"

  delivery_destination_configuration {
    destination_resource_arn = aws_s3_bucket.user_access.arn
  }
}

resource "aws_cloudwatch_log_delivery" "user_access" {
  region                   = "us-east-1"
  delivery_source_name     = var.source_name
  delivery_destination_arn = aws_cloudwatch_log_delivery_destination.user_access.arn

  depends_on = [
    aws_s3_bucket_policy.user_access_log_delivery,
  ]

  record_fields = [
    "date",
    "time",
    "time-taken",
    "c-country",
    "sc-status",
  ]
  s3_delivery_configuration {
    enable_hive_compatible_path = true
    suffix_path                 = "{distributionid}/{yyyy}/{MM}/{dd}/{HH}/"
  }
}

data "aws_iam_policy_document" "user_access_log_delivery" {
  statement {
    sid = "AWSLogDeliveryAclCheck"

    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }

    actions = [
      "s3:GetBucketAcl",
      "s3:ListBucket",
    ]

    resources = [
      aws_s3_bucket.user_access.arn,
    ]

    condition {
      test     = "StringEquals"
      variable = "aws:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = ["arn:aws:logs:us-east-1:${data.aws_caller_identity.current.account_id}:*"]
    }
  }

  statement {
    sid = "AWSLogDeliveryWrite"

    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }

    actions = [
      "s3:PutObject",
    ]

    resources = [
      "${aws_s3_bucket.user_access.arn}/AWSLogs/aws-account-id=${data.aws_caller_identity.current.account_id}/CloudFront/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = ["arn:aws:logs:us-east-1:${data.aws_caller_identity.current.account_id}:*"]
    }
  }
}

resource "aws_s3_bucket_policy" "user_access_log_delivery" {
  bucket = aws_s3_bucket.user_access.id
  policy = data.aws_iam_policy_document.user_access_log_delivery.json
}

output "bucket_name" {
  value = aws_s3_bucket.user_access.bucket
}
