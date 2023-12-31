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
  region = "eu-west-2"
}

resource "aws_s3_bucket" "sherlihyDotCom" {
    bucket_prefix = "sherlihyDotCom"
}

resource "aws_s3_bucket_policy" "sherlihyDotCom" {
  bucket = aws_s3_bucket.example.id
  #policy = templatefile("s3-policy.json", { bucket = var.bucketName })

    policy = {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "${aws_s3_bucket.sherlihyDotCom.id}/*"
    }
  ]
}
}

resource "aws_s3_bucket_website_configuration" "sherlihyDotCom" {
  bucket = aws_s3_bucket.sherlihyDotCom.bucket
  index_document = {
    suffix = "index.html"
  }
}

resource "aws_s3_object" "dist-to-objects" {
    count = length(var.dist_files)

    bucket = aws_s3_bucket.sherlihyDotCom.id
    key = var.dist_files[count.index]
    source = "../../dist/${var.dist_files[count.index]}"
    
    acl = "public-read"
}

variable "dist_files" {
    type = list(string)
}

resource "aws_s3_object" "sherlihyDotCom" {
    bucket = aws_s3_bucket.sherlihyDotCom.id
    key = "index.html"
    source = "../../dist/index.html"
    
    acl = "public-read"
}
