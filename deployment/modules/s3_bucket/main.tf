resource "aws_s3_bucket" "sherlihy_dot_com" {
  bucket_prefix = var.bucket_prefix

    tags = var.resource_tags
}

resource "aws_s3_bucket_ownership_controls" "sherlihy_dot_com" {
  bucket = aws_s3_bucket.sherlihy_dot_com.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "sherlihy_dot_com" {
  bucket = aws_s3_bucket.sherlihy_dot_com.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "sherlihy_dot_com" {
  depends_on = [
    aws_s3_bucket_ownership_controls.sherlihy_dot_com,
    aws_s3_bucket_public_access_block.sherlihy_dot_com,
  ]

  bucket = aws_s3_bucket.sherlihy_dot_com.id
  acl    = "public-read"
}

// really I want to assume a role that allows me to upload to the bucket
data "aws_iam_policy_document" "sherlihy_dot_com" {
    statement {
        principals {
            type = "AWS"
            identifiers = [var.profile_arn]
        }

        actions = [
            "s3:*",
        ]

        resources = [
            aws_s3_bucket.sherlihy_dot_com.arn,
            "${aws_s3_bucket.sherlihy_dot_com.arn}/*",
        ]
    }

    statement {
        principals {
            type = "*"
            identifiers = ["*"]
        }

        actions = [
            "s3:Get*",
            "s3:List*",
        ]

        resources = [
            aws_s3_bucket.sherlihy_dot_com.arn,
            "${aws_s3_bucket.sherlihy_dot_com.arn}/*",
        ]
    }
}

resource "aws_s3_bucket_policy" "sherlihy_dot_com" {
  bucket = aws_s3_bucket_public_access_block.sherlihy_dot_com.id

    policy = data.aws_iam_policy_document.sherlihy_dot_com.json
}

resource "aws_s3_bucket_website_configuration" "sherlihy_dot_com" {
    depends_on = [
        aws_s3_bucket_policy.sherlihy_dot_com
    ]

  bucket = aws_s3_bucket.sherlihy_dot_com.id
  index_document {
    suffix = "index.html"
  }
}
