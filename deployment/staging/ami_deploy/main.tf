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
}

resource "aws_internet_gateway" "sherlihyDotCom-stage-ami" {
  tags   = local.cost_tags
  vpc_id = aws_vpc.sherlihyDotCom-stage-ami.id
}

resource "aws_subnet" "sherlihyDotCom-stage-ami-publics" {
  tags       = local.cost_tags
  count      = 2
  vpc_id     = aws_vpc.sherlihyDotCom-stage-ami.id
  cidr_block = "10.0.${count.index + 1}.0/24"

  availability_zone = data.aws_availability_zones.available.names[count.index]
}

resource "aws_route_table" "sherlihyDotCom-stage-ami-publics-inet_gw" {
  tags   = local.cost_tags
  vpc_id = aws_vpc.sherlihyDotCom-stage-ami.id
}

resource "aws_route" "inet_gw" {
  route_table_id         = aws_route_table.sherlihyDotCom-stage-ami-publics-inet_gw.id
  destination_cidr_block = "0.0.0.0/0"

  gateway_id = aws_internet_gateway.sherlihyDotCom-stage-ami.id
}

resource "aws_route_table_association" "sherlihyDotCom-stage-ami-publics-inet_gw" {
  count = length(aws_subnet.sherlihyDotCom-stage-ami-publics)

  subnet_id      = aws_subnet.sherlihyDotCom-stage-ami-publics[count.index].id
  route_table_id = aws_route_table.sherlihyDotCom-stage-ami-publics-inet_gw.id
}

resource "aws_key_pair" "sherlihyDotCom_ami" {
  tags       = local.cost_tags
  key_name   = "sherlihyDotCom-ami"
  public_key = file("./.ssh/id_rsa.pub")
}

module "web_server_instance" {
  count  = length(aws_subnet.sherlihyDotCom-stage-ami-publics)
  source = "../../modules/image_instance"

  vpc_id    = aws_vpc.sherlihyDotCom-stage-ami.id
  subnet_id = aws_subnet.sherlihyDotCom-stage-ami-publics[count.index].id

  ingress_port_list = tolist([80, 443])

  key_name = aws_key_pair.sherlihyDotCom_ami.key_name

  init_file_path = "../../configuration_scripts/web_server-init.sh"

  resource_tags = local.cost_tags
}

locals {
  subnet_ids   = [for subnet in aws_subnet.sherlihyDotCom-stage-ami-publics : subnet.id]
  instance_ids = [for instance in module.web_server_instance : instance.instance_id]
}

module "lb_tls_proxy" {
  source = "../../modules/lb_tls_proxy"

  vpc_id = aws_vpc.sherlihyDotCom-stage-ami.id

  ingress_port_list = tolist([80, 443])

  instance_ids = local.instance_ids
  subnet_ids   = local.subnet_ids

  target_port  = 80
  TLS_cert_arn = var.TLS_cert_arn

  resource_tags = local.cost_tags

    unique_id = "sherlihyDotCom-stage-ami"
}

output "lb_domain_name" {
    value = module.lb_tls_proxy.dns_name
}

output "lb_zone_id" {
    value = module.lb_tls_proxy.zone_id
}
