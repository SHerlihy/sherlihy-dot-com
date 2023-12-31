terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

resource "aws_security_group" "inet_access" {
  tags = var.resource_tags
  name   = "inetAccess"
  vpc_id = var.vpc_id
}

resource "aws_security_group_rule" "inet_ingress_https" {
    count = length(var.ingress_port_list)
  type              = "ingress"
  security_group_id = aws_security_group.inet_access.id

  from_port   = var.ingress_port_list[count.index]
  to_port     = var.ingress_port_list[count.index]
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

resource "aws_lb" "inet-server" {
  tags = var.resource_tags
  name               = "sherlihyDotCom-lb"
  internal           = false
  load_balancer_type = "application"

  security_groups = [aws_security_group.inet_access.id]
  subnets         = var.subnet_ids
}

resource "aws_lb_target_group" "sherlihy_dot_com-server" {
  tags = var.resource_tags
  name     = "sherlihyDotCom-server"
  port     = var.target_port
  protocol = "HTTP"
  vpc_id   = var.vpc_id
}

resource "aws_lb_target_group_attachment" "server" {
    count = length(var.instance_ids)

  target_group_arn = aws_lb_target_group.sherlihy_dot_com-server.arn
  target_id        = var.instance_ids[count.index]
  port             = var.target_port
}

resource "aws_lb_listener" "front_end" {
  tags = var.resource_tags
  load_balancer_arn = aws_lb.inet-server.arn
  port              = 443
  protocol          = "HTTPS"

  ssl_policy      = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn = var.TLS_cert_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.sherlihy_dot_com-server.arn
  }
}
