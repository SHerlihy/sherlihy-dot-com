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

resource "aws_default_subnet" "default_az2" {
  availability_zone = "eu-west-2c"

  tags = {
    Name = "Default subnet for eu-west-2c"
  }
}

resource "aws_security_group" "lb_test-staging" {
  name   = "lb_test-staging"
  vpc_id = aws_default_vpc.default.id
}

resource "aws_security_group_rule" "ingress_http" {
  type              = "ingress"
  security_group_id = aws_security_group.lb_test-staging.id

  from_port   = "80"
  to_port     = "80"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "egress_all_ports" {
  type              = "egress"
  security_group_id = aws_security_group.lb_test-staging.id

  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
}

data "aws_ami" "lb_test-staging" {
  most_recent = true
  owners      = ["111644099040"]

  filter {
    name   = "name"
    values = ["sherlihy-dot-com/*"]
  }
}

resource "aws_instance" "lb_test-staging-az1" {
  ami           = data.aws_ami.lb_test-staging.id
  instance_type = "t2.micro"

  subnet_id = aws_default_subnet.default_az1.id

  vpc_security_group_ids = [aws_security_group.lb_test-staging.id]

    user_data = file("../configuration_scripts/web_server-init.sh")

  tags = {
    Name = "lb_test-staging"
  }
}

resource "aws_instance" "lb_test-staging-az2" {
  ami           = data.aws_ami.lb_test-staging.id
  instance_type = "t2.micro"

  subnet_id = aws_default_subnet.default_az2.id

  vpc_security_group_ids = [aws_security_group.lb_test-staging.id]

    user_data = file("../configuration_scripts/web_server-init.sh")

  tags = {
    Name = "lb_test-staging"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.lb_test-staging.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.lb_test-staging.arn
  }
}

resource "aws_alb_target_group_attachment" "lb_test-http1" {
  target_group_arn = "${aws_lb_target_group.lb_test-staging.arn}"
  target_id        = "${aws_instance.lb_test-staging-az1.id}"
  port             = 80
}

resource "aws_alb_target_group_attachment" "lb_test-http2" {
  target_group_arn = "${aws_lb_target_group.lb_test-staging.arn}"
  target_id        = "${aws_instance.lb_test-staging-az2.id}"
  port             = 80
}

resource "aws_lb_target_group" "lb_test-staging" {
  name        = "lbtest-staging"
  target_type = "instance"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_default_vpc.default.id
}

resource "aws_lb" "lb_test-staging" {
  name               = "lbtest-staging"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb_test-staging.id]
  subnets            = [aws_default_subnet.default_az1.id, aws_default_subnet.default_az2.id]
}
