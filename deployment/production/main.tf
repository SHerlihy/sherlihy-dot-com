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
    project     = "sherlihyDotCom"
    env = "production"
  })
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "sherlihy_dot_com" {
  tags       = local.cost_tags
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "sherlihy_dot_com" {
  tags   = local.cost_tags
  vpc_id = aws_vpc.sherlihy_dot_com.id
}

resource "aws_subnet" "publics" {
  tags       = local.cost_tags
  count      = 2
  vpc_id     = aws_vpc.sherlihy_dot_com.id
  cidr_block = "10.0.${count.index + 1}.0/24"

  availability_zone = data.aws_availability_zones.available.names[count.index]
}

resource "aws_route_table" "inet_gw-publics" {
  tags   = local.cost_tags
  vpc_id = aws_vpc.sherlihy_dot_com.id
}

resource "aws_route" "inet_gw" {
  route_table_id         = aws_route_table.inet_gw-publics.id
  destination_cidr_block = "0.0.0.0/0"

  gateway_id = aws_internet_gateway.sherlihy_dot_com.id
}

resource "aws_route_table_association" "inet_gw-publics" {
  count = length(aws_subnet.publics)

  subnet_id      = aws_subnet.publics[count.index].id
  route_table_id = aws_route_table.inet_gw-publics.id
}

resource "aws_key_pair" "sherlihyDotCom_instance" {
  tags       = local.cost_tags
  key_name   = "sherlihyDotCom-instance"
  public_key = file("./.ssh/id_rsa.pub")
}

module "web_server_instance" {
  count  = length(aws_subnet.publics)
  source = "../modules/image_instance"

  vpc_id    = aws_vpc.sherlihy_dot_com.id
  subnet_id = aws_subnet.publics[count.index].id

  ingress_port_list = tolist([80, 443])

  key_name = aws_key_pair.sherlihyDotCom_instance.key_name

  init_file_path = "../configuration_scripts/web_server-init.sh"

  resource_tags = local.cost_tags
}

locals {
  subnet_ids   = [for subnet in aws_subnet.publics : subnet.id]
  instance_ids = [for instance in module.web_server_instance : instance.instance_id]
}

module "lb_tls_proxy" {
  source = "../modules/lb_tls_proxy"

  vpc_id = aws_vpc.sherlihy_dot_com.id

  ingress_port_list = tolist([80, 443])

  instance_ids = local.instance_ids
  subnet_ids   = local.subnet_ids

  target_port  = 80
  TLS_cert_arn = var.TLS_cert_arn

  resource_tags = local.cost_tags
}

resource "aws_route53_record" "sherlihy_dot_com" {
  zone_id = var.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = module.lb_tls_proxy.dns_name
    zone_id                = module.lb_tls_proxy.zone_id
    evaluate_target_health = true
  }
}

// Wont work for 24hrs see: https://github.com/hashicorp/terraform-provider-aws/issues/31442
//resource "aws_ce_cost_allocation_tag" "cost_project" {
//  tag_key = "project"
//  status  = "Active"
//}

// reading AWS CE (Cost Explorer) Cost Allocation Tags (env): empty result
//resource "aws_ce_cost_allocation_tag" "cost_tags" {
//    for_each = local.cost_tags
//
//  tag_key = each.key
//  status  = "Active"
//}
