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
  cidr_block       = "10.0.0.0/16"
}

resource "aws_internet_gateway" "lb_test" {
  vpc_id = aws_vpc.lb_test.id
}

resource "aws_subnet" "public-1" {
  vpc_id     = aws_vpc.lb_test.id
  cidr_block = "10.0.1.0/24"

availability_zone = data.aws_availability_zones.available.names[0]
}

resource "aws_subnet" "public-2" {
  vpc_id     = aws_vpc.lb_test.id
  cidr_block = "10.0.2.0/24"

availability_zone = data.aws_availability_zones.available.names[1]
}

resource "aws_subnet" "private-1" {
  vpc_id     = aws_vpc.lb_test.id
  cidr_block = "10.0.3.0/24"

availability_zone = data.aws_availability_zones.available.names[0]
}

resource "aws_subnet" "private-2" {
  vpc_id     = aws_vpc.lb_test.id
  cidr_block = "10.0.4.0/24"

availability_zone = data.aws_availability_zones.available.names[1]
}

resource "aws_route_table" "inet_gw-publics" {
  vpc_id = aws_vpc.lb_test.id
}

resource "aws_route" "inet_gw" {
  route_table_id            = aws_route_table.inet_gw-publics.id
  destination_cidr_block    = "0.0.0.0/0"

  gateway_id     = aws_internet_gateway.lb_test.id
}

resource "aws_route_table_association" "inet_gw-public_1" {
  subnet_id      = aws_subnet.public-1.id
  route_table_id = aws_route_table.inet_gw-publics.id
}

resource "aws_route_table_association" "inet_gw-public_2" {
  subnet_id      = aws_subnet.public-2.id
  route_table_id = aws_route_table.inet_gw-publics.id
}

resource "aws_eip" "nat_gw-az0" {
  //domain   = "vpc"

  # To ensure proper ordering, it is recommended to add an explicit dependency
  # on the Internet Gateway for the VPC.
  depends_on = [aws_internet_gateway.lb_test]
}

resource "aws_nat_gateway" "nat-pub_pvt-az0" {
  allocation_id = aws_eip.nat_gw-az0.id
  subnet_id     = aws_subnet.public-1.id

    connectivity_type = "public"

  tags = {
    Name = "gw NAT"
  }

  # To ensure proper ordering, it is recommended to add an explicit dependency
  # on the Internet Gateway for the VPC.
  depends_on = [aws_internet_gateway.lb_test]
}

resource "aws_route_table" "nat_gw-public_private-az0" {
  vpc_id = aws_vpc.lb_test.id
}

resource "aws_route" "nat_gw-az0" {
  route_table_id            = aws_route_table.nat_gw-public_private-az0.id
  destination_cidr_block    = "0.0.0.0/0"

    nat_gateway_id = aws_nat_gateway.nat-pub_pvt-az0.id
}

resource "aws_route_table_association" "nat_gw-private_1" {
  subnet_id      = aws_subnet.private-1.id
  route_table_id = aws_route_table.nat_gw-public_private-az0.id
}

resource "aws_eip" "nat_gw-az1" {
  //domain   = "vpc"

  # To ensure proper ordering, it is recommended to add an explicit dependency
  # on the Internet Gateway for the VPC.
  depends_on = [aws_internet_gateway.lb_test]
}

resource "aws_nat_gateway" "nat-pub_pvt-az1" {
  allocation_id = aws_eip.nat_gw-az1.id
  subnet_id     = aws_subnet.public-2.id

    connectivity_type = "public"

  tags = {
    Name = "gw NAT"
  }

  # To ensure proper ordering, it is recommended to add an explicit dependency
  # on the Internet Gateway for the VPC.
  depends_on = [aws_internet_gateway.lb_test]
}

resource "aws_route_table" "nat_gw-public_private-az1" {
  vpc_id = aws_vpc.lb_test.id
}

resource "aws_route" "nat_gw-az1" {
  route_table_id            = aws_route_table.nat_gw-public_private-az1.id
  destination_cidr_block    = "0.0.0.0/0"

    nat_gateway_id = aws_nat_gateway.nat-pub_pvt-az1.id
}

resource "aws_route_table_association" "nat_gw-private_2" {
  subnet_id      = aws_subnet.private-2.id
  route_table_id = aws_route_table.nat_gw-public_private-az1.id
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

resource "aws_instance" "sherlihy_dot_com-lb_test-pvt1" {
  ami           = data.aws_ami.sherlihy_dot_com-lb_test.id
  instance_type = "t2.micro"

  subnet_id = aws_subnet.private-1.id

  vpc_security_group_ids = [aws_security_group.web_page-lb_test.id]

  user_data = file("../configuration_scripts/web_server-init.sh")
}

resource "aws_instance" "sherlihy_dot_com-lb_test-pvt2" {
  ami           = data.aws_ami.sherlihy_dot_com-lb_test.id
  instance_type = "t2.micro"

  subnet_id = aws_subnet.private-2.id

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

resource "aws_lb" "lb_test" {
  name               = "lb-test"
  internal           = false
  load_balancer_type = "application"

  security_groups    = [aws_security_group.inet_access.id]
  subnets            = [aws_subnet.public-1.id, aws_subnet.public-2.id]
}

resource "aws_lb_target_group" "privates" {
  name     = "privates-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.lb_test.id
}

resource "aws_lb_target_group_attachment" "private1" {
  target_group_arn = aws_lb_target_group.privates.arn
  target_id        = aws_instance.sherlihy_dot_com-lb_test-pvt1.id
  port             = 80
}

resource "aws_lb_target_group_attachment" "private2" {
  target_group_arn = aws_lb_target_group.privates.arn
  target_id        = aws_instance.sherlihy_dot_com-lb_test-pvt2.id
  port             = 80
}

resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.lb_test.arn
  port              = 443
  protocol          = "HTTPS"

 ssl_policy = "ELBSecurityPolicy-TLS13-1-2-2021-06"
 certificate_arn   = var.TLS_cert_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.privates.arn
  }
}

resource "aws_route53_record" "www" {
  zone_id = var.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_lb.lb_test.dns_name
    zone_id                = aws_lb.lb_test.zone_id
    evaluate_target_health = true
  }
}

variable "zone_id" {
    type = string
}

variable "domain_name" {
    type = string
}

variable "TLS_cert_arn" {
    type = string
}
