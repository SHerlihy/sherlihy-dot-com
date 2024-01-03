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

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "sherlihyDotCom-prod-ami" {
  tags       = var.resource_tags
  cidr_block = "10.0.0.0/16"

    enable_dns_hostnames = true
}

resource "aws_internet_gateway" "sherlihyDotCom-prod-ami" {
  tags   = var.resource_tags
  vpc_id = aws_vpc.sherlihyDotCom-prod-ami.id
}

resource "aws_subnet" "sherlihyDotCom-prod-ami" {
  tags       = var.resource_tags
  vpc_id     = aws_vpc.sherlihyDotCom-prod-ami.id
  cidr_block = "10.0.1.0/24"

  availability_zone = data.aws_availability_zones.available.names[0]
}

resource "aws_route_table" "sherlihyDotCom-prod-ami-inet_gw" {
  tags   = var.resource_tags
  vpc_id = aws_vpc.sherlihyDotCom-prod-ami.id
}

resource "aws_route" "inet_gw" {
  route_table_id         = aws_route_table.sherlihyDotCom-prod-ami-inet_gw.id
  destination_cidr_block = "0.0.0.0/0"

  gateway_id = aws_internet_gateway.sherlihyDotCom-prod-ami.id
}

resource "aws_route_table_association" "sherlihyDotCom-prod-ami-inet_gw" {

  subnet_id      = aws_subnet.sherlihyDotCom-prod-ami.id
  route_table_id = aws_route_table.sherlihyDotCom-prod-ami-inet_gw.id
}

resource "aws_key_pair" "sherlihyDotCom_ami" {
  tags       = var.resource_tags
  key_name   = "sherlihyDotCom-ami"
  public_key = file(var.pub_key_path)
}

module "web_server_instance" {
  source = "../../modules/image_instance"

  vpc_id    = aws_vpc.sherlihyDotCom-prod-ami.id
  subnet_id = aws_subnet.sherlihyDotCom-prod-ami.id

  ingress_port_list = tolist([80, 443])

  key_name = aws_key_pair.sherlihyDotCom_ami.key_name

  init_file_path = var.config_script_path

  resource_tags = var.resource_tags

    is_public = true
}

output "public_dns" {
    value = module.web_server_instance.public_dns
}
