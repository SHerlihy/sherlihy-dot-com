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

resource "aws_default_vpc" "default" {
  tags = {
    Name = "Default VPC"
  }
}

resource "aws_default_subnet" "default_az1" {
  availability_zone = "eu-west-2b"

  tags = {
    Name = "Default subnet for eu-west-2b"
  }
}

resource "aws_security_group" "web_page-staging" {
  name   = "web_page-staging"
  vpc_id = aws_default_vpc.default.id
}

resource "aws_security_group_rule" "ingress_https" {
  type              = "ingress"
  security_group_id = aws_security_group.web_page-staging.id

  from_port   = "443"
  to_port     = "443"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "ingress_http" {
  type              = "ingress"
  security_group_id = aws_security_group.web_page-staging.id

  from_port   = "80"
  to_port     = "80"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "egress_all_ports" {
  type              = "egress"
  security_group_id = aws_security_group.web_page-staging.id

  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
}

data "aws_ami" "sherlihy_dot_com-staging" {
  most_recent = true
  owners      = ["111644099040"]

  filter {
    name   = "name"
    values = ["sherlihy-dot-com/*"]
  }
}

resource "aws_instance" "sherlihy_dot_com-staging" {
  ami           = data.aws_ami.sherlihy_dot_com-staging.id
  instance_type = "t2.micro"

  subnet_id = aws_default_subnet.default_az1.id

  vpc_security_group_ids = [aws_security_group.web_page-staging.id]

//    user_data = file("../configuration_scripts/web_server-init.sh")

  tags = {
    Name = "sherlihy_dot_com-staging"
  }
}

//resource "aws_acm_certificate" "sherlihy-cert" {
//  domain_name       = "sherlihy.com"
//  validation_method = "DNS"
//
//  lifecycle {
//    create_before_destroy = true
//  }
//}
//
//resource "aws_elb" "main" {
//  name               = "foobar-terraform-elb"
//  availability_zones = ["eu-west-2b"]
//
//  listener {
//    instance_port     = 443
//    instance_protocol = "https"
//    lb_port           = 443
//    lb_protocol       = "https"
//  }
//}
//
//resource "aws_route53_record" "www" {
//  zone_id = aws_route53_zone.primary.zone_id
//  name    = "example.com"
//  type    = "A"
//
//  alias {
//    name                   = aws_elb.main.dns_name
//    zone_id                = aws_elb.main.zone_id
//    evaluate_target_health = true
//  }
//}
