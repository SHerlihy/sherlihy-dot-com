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

resource "aws_eip" "future_lb" {
  //domain   = "vpc"

  # To ensure proper ordering, it is recommended to add an explicit dependency
  # on the Internet Gateway for the VPC.
  depends_on = [aws_internet_gateway.lb_test]
}

resource "aws_nat_gateway" "lb_test" {
  allocation_id = aws_eip.future_lb.id
  subnet_id     = aws_subnet.public-1.id

    connectivity_type = "public"

  tags = {
    Name = "gw NAT"
  }

  # To ensure proper ordering, it is recommended to add an explicit dependency
  # on the Internet Gateway for the VPC.
  depends_on = [aws_internet_gateway.lb_test]
}

resource "aws_route_table" "nat_gw-privates" {
  vpc_id = aws_vpc.lb_test.id
}

resource "aws_route" "nat_gw" {
  route_table_id            = aws_route_table.nat_gw-privates.id
  destination_cidr_block    = "0.0.0.0/0"

    nat_gateway_id = aws_nat_gateway.lb_test.id
}

resource "aws_route_table_association" "nat_gw-private_1" {
  subnet_id      = aws_subnet.private-1.id
  route_table_id = aws_route_table.nat_gw-privates.id
}

resource "aws_route_table_association" "nat_gw-private_2" {
  subnet_id      = aws_subnet.private-2.id
  route_table_id = aws_route_table.nat_gw-privates.id
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

//resource "aws_acm_certificate" "cert" {
//  domain_name       = aws_lb.lb_test.dns_name
//  validation_method = "DNS"
//
//lifecycle {
//    create_before_destroy = true
//  }
//}

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

 // port              = 80
 // protocol          = "HTTP"
  port              = 443
  protocol          = "HTTPS"

 ssl_policy = "ELBSecurityPolicy-TLS13-1-2-2021-06"
 certificate_arn   = "arn:aws:acm:eu-west-2:111644099040:certificate/180c3701-3923-4407-9613-9d9a04d1dca9"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.privates.arn
  }
}

resource "aws_route53_record" "www" {
  zone_id = "Z01772082XKBXYLJYG8P2"
  name    = "sherlihy.com"
  type    = "A"

  alias {
    name                   = aws_lb.lb_test.dns_name
    zone_id                = aws_lb.lb_test.zone_id
    evaluate_target_health = true
  }
}

output "lb_dns" {
    value = aws_lb.lb_test.dns_name
}
//resource "aws_acm_certificate" "lb_test" {
//  domain_name       = aws_lb.lb_test.dns_name
//  validation_method = "DNS"
//}

//data "aws_route53_zone" "lb_test" {
//  name         = aws_lb.lb_test.dns_name
//  private_zone = false
//}

//resource "aws_route53_record" "lb_test" {
//  zone_id = data.aws_route53_zone.lb_test.zone_id
//  name    = aws_lb.lb_test.dns_name
//  type    = "A"
//  ttl     = 300
//  records = [aws_eip.future_lb.public_ip]
//}

//resource "aws_route53_record" "lb_test" {
//  for_each = {
//    for dvo in aws_acm_certificate.lb_test.domain_validation_options : dvo.domain_name => {
//      name   = dvo.resource_record_name
//      record = dvo.resource_record_value
//      type   = dvo.resource_record_type
//    }
//  }
//
//  allow_overwrite = true
//  name            = each.value.name
//  records         = [each.value.record]
//  ttl             = 60
//  type            = each.value.type
//  zone_id         = data.aws_route53_zone.lb_test.zone_id
//}

//resource "aws_acm_certificate_validation" "lb_test" {
//  certificate_arn         = aws_acm_certificate.lb_test.arn
//  validation_record_fqdns = [aws_route53_record.lb_test.fqdn]
//}

//resource "aws_lb_listener" "front_end" {
//  load_balancer_arn = aws_lb.lb_test.arn
//  port              = "80"
//  protocol          = "HTTP"
//
//  default_action {
//    type             = "forward"
//    target_group_arn = aws_lb_target_group.privates.arn
//  }
//}

