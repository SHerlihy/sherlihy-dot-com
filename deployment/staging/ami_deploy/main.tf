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

module "cdn_cert" {
    source = "../../modules/cdn_cert"
    
    domain_name = var.domain_name

    content_public_dns = module.web_server_instance.public_dns
}
