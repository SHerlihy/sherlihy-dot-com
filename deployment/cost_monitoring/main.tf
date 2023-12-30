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
  region = "us-east-1"
}

data "aws_availability_zones" "available" {
  state = "available"
}

#s3 bucket

resource "aws_s3_bucket" "sherlihyDotCom-costage" {
    bucket_prefix = "sherlihydotcom--costage"

  tags = {
    project        = "sherlihydotcom"
    environment = "all"
  }
}

# 6th/7th is when the bill is finalised see https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html Report Timeline

resource "aws_cur_report_definition" "sherlihyDotCom-costage" {
  report_name                = "sherlihydotcom--costage"
  time_unit                  = "DAILY"
  format                     = "textORcsv"
  compression                = "GZIP"
    #Not containerised so only need resources https://docs.aws.amazon.com/cur/latest/userguide/split-cost-allocation-data.html
  additional_schema_elements = ["RESOURCES"]
  s3_bucket                  = aws_s3_bucket.sherlihyDotCom-costage.id
  s3_region                  = aws_s3_bucket.sherlihyDotCom-costage.region
  additional_artifacts       = ["ATHENA"]

    #due to 6th/7th having refunds etc applied
    refresh_closed_reports = true
    
    #mandatory as "athena" is artifact
    report_versioning = "OVERWRITE_REPORT"
}

#Hoping that Cost Explorer Saved Reports will have this cur report and from there can see details in Cost Explorer

#All garbage need cost allocation tags instead
