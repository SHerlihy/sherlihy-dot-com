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

locals {
  cost_tags = tomap({
    project = "sherlihyDotCom"
    env     = "staging"
  })
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "sherlihyDotCom-stage-ami" {
  tags       = local.cost_tags
  cidr_block = "10.0.0.0/16"

    enable_dns_hostnames = true
}

resource "aws_internet_gateway" "sherlihyDotCom-stage-ami" {
  tags   = local.cost_tags
  vpc_id = aws_vpc.sherlihyDotCom-stage-ami.id
}

resource "aws_subnet" "sherlihyDotCom-stage-ami" {
  tags       = local.cost_tags
  vpc_id     = aws_vpc.sherlihyDotCom-stage-ami.id
  cidr_block = "10.0.1.0/24"

  availability_zone = data.aws_availability_zones.available.names[0]
}

resource "aws_route_table" "sherlihyDotCom-stage-ami-inet_gw" {
  tags   = local.cost_tags
  vpc_id = aws_vpc.sherlihyDotCom-stage-ami.id
}

resource "aws_route" "inet_gw" {
  route_table_id         = aws_route_table.sherlihyDotCom-stage-ami-inet_gw.id
  destination_cidr_block = "0.0.0.0/0"

  gateway_id = aws_internet_gateway.sherlihyDotCom-stage-ami.id
}

resource "aws_route_table_association" "sherlihyDotCom-stage-ami-inet_gw" {

  subnet_id      = aws_subnet.sherlihyDotCom-stage-ami.id
  route_table_id = aws_route_table.sherlihyDotCom-stage-ami-inet_gw.id
}

resource "aws_key_pair" "sherlihyDotCom_ami" {
  tags       = local.cost_tags
  key_name   = "sherlihyDotCom-ami"
  public_key = file("./.ssh/id_rsa.pub")
}

module "web_server_instance" {
  source = "../../modules/image_instance"

  vpc_id    = aws_vpc.sherlihyDotCom-stage-ami.id
  subnet_id = aws_subnet.sherlihyDotCom-stage-ami.id

  ingress_port_list = tolist([80, 443])

  key_name = aws_key_pair.sherlihyDotCom_ami.key_name

  init_file_path = "../../configuration_scripts/web_server-init.sh"

  resource_tags = local.cost_tags

    is_public = true
}

output "instance_ip" {
   value = module.web_server_instance.instance_ip 
}

locals {
    s3_origin_id = "sherlihyDotComStageAMI"
}

resource "aws_cloudfront_cache_policy" "sherlihydotcom-stage-ami" {
    name = "sherlihydotcom-stage-ami"

    min_ttl     = 1

      parameters_in_cache_key_and_forwarded_to_origin {
        cookies_config {
            cookie_behavior = "none"
        }

        headers_config {
            header_behavior = "none"
        }

        query_strings_config {
            query_string_behavior = "none"
        }
    }
}

resource "aws_cloudfront_distribution" "sherlihydotcom-stage-ami" {
  origin {
    origin_id                = local.s3_origin_id

    custom_origin_config {
        http_port = 80
        https_port = 443
        #origin_protocol_policy = "match-viewer"
        origin_protocol_policy = "http-only"
        origin_ssl_protocols = ["TLSv1"]
    }

    domain_name              = module.web_server_instance.public_dns
  }

  enabled             = true
  #default_root_object = "index.html"

      # aliases = ["mysite.example.com", "yoursite.example.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

        cache_policy_id = aws_cloudfront_cache_policy.sherlihydotcom-stage-ami.id

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

      price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

output "domain_name-CDN" {
    value = aws_cloudfront_distribution.sherlihydotcom-stage-ami.domain_name
}

output "hosted_zone_id-CDN" {
    value = aws_cloudfront_distribution.sherlihydotcom-stage-ami.hosted_zone_id
}
