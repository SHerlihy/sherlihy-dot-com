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

resource "aws_vpc" "lb_test" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "lb_test" {
  vpc_id = aws_vpc.lb_test.id
}

locals {
  az_names = { for idx, az_name in data.aws_availability_zones.available.names : idx => az_name }
}

resource "aws_subnet" "publics" {
  for_each = local.az_names

  vpc_id     = aws_vpc.lb_test.id
  cidr_block = "10.0.${(each.key + 1) * 2}.0/24"

  availability_zone = each.value

  tags = {
    az_name = each.value
  }
}

resource "aws_subnet" "privates" {
  for_each = local.az_names

  vpc_id     = aws_vpc.lb_test.id
  cidr_block = "10.0.${(each.key * 2) + 1}.0/24"

  availability_zone = each.value

  tags = {
    az_name = each.value
  }
}

resource "aws_route_table" "inet_gw-publics" {
  vpc_id = aws_vpc.lb_test.id
}

resource "aws_route" "inet_gw" {
  route_table_id         = aws_route_table.inet_gw-publics.id
  destination_cidr_block = "0.0.0.0/0"

  gateway_id = aws_internet_gateway.lb_test.id
}

resource "aws_route_table_association" "inet_gw-publics" {
  for_each = aws_subnet.publics

  subnet_id      = each.value.id
  route_table_id = aws_route_table.inet_gw-publics.id
}

locals {
  az_name-public_subnet  = { for idx, public_subnet in aws_subnet.publics : public_subnet.tags_all.az_name => public_subnet.id }
  az_name-private_subnet = { for idx, private_subnet in aws_subnet.privates : private_subnet.tags_all.az_name => private_subnet.id }
  az_name-subnets = { for idx, az_name in local.az_names : az_name => {
    pubId = local.az_name-public_subnet[az_name]
    pvtId = local.az_name-private_subnet[az_name]
    }
  }
}

module "nat_access" {
  for_each = local.az_name-subnets
  source   = "../modules/nat_access"

  vpc_id = aws_vpc.lb_test.id

  pub_subnet_id = each.value.pubId

  pvt_subnet_id = each.value.pvtId

  depends_on = [aws_internet_gateway.lb_test]
}

resource "aws_security_group" "web_page-lb_test" {
  name   = "web_page-lb_test"
  vpc_id = aws_vpc.lb_test.id
}

resource "aws_security_group_rule" "ingress_http" {
  type              = "ingress"
  security_group_id = aws_security_group.web_page-lb_test.id

  from_port   = "80"
  to_port     = "80"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "egress_all_ports" {
  type              = "egress"
  security_group_id = aws_security_group.web_page-lb_test.id

  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
}

data "aws_ami" "sherlihy_dot_com-lb_test" {
  most_recent = true
  owners      = ["111644099040"]

  filter {
    name   = "name"
    values = ["sherlihy-dot-com/*"]
  }
}

resource "aws_instance" "sherlihy_dot_com-pvts" {
  for_each      = aws_subnet.privates
  ami           = data.aws_ami.sherlihy_dot_com-lb_test.id
  instance_type = "t2.micro"

  subnet_id = each.value.id

  vpc_security_group_ids = [aws_security_group.web_page-lb_test.id]

  user_data = file("../configuration_scripts/web_server-init.sh")
}

resource "aws_security_group" "inet_access" {
  name   = "inetAccess"
  vpc_id = aws_vpc.lb_test.id
}

resource "aws_security_group_rule" "inet_ingress_https" {
  type              = "ingress"
  security_group_id = aws_security_group.inet_access.id

  from_port   = "443"
  to_port     = "443"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "inet_ingress_http" {
  type              = "ingress"
  security_group_id = aws_security_group.inet_access.id

  from_port   = "80"
  to_port     = "80"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "inet_egress" {
  type              = "egress"
  security_group_id = aws_security_group.inet_access.id

  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
}

locals {
  pub_subnets-ids = [for publicInstance in aws_subnet.publics : publicInstance.id]
}

resource "aws_lb" "lb_test" {
  name               = "lb-test"
  internal           = false
  load_balancer_type = "application"

  security_groups = [aws_security_group.inet_access.id]
  subnets         = local.pub_subnets-ids
}

resource "aws_lb_target_group" "privates" {
  name     = "privates-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.lb_test.id
}

resource "aws_lb_target_group_attachment" "privates" {
  for_each = aws_instance.sherlihy_dot_com-pvts

  target_group_arn = aws_lb_target_group.privates.arn
  target_id        = each.value.id
  port             = 80
}

resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.lb_test.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.privates.arn
  }
}
}
