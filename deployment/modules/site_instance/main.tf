terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

resource "aws_security_group" "sherlihyDotCom_instance" {
  tags = var.resource_tags
  name   = "instance-sherlihyDotCom-${var.subnet_id}"
  vpc_id = var.vpc_id
}

resource "aws_security_group_rule" "ingress_ssh" {
  type              = "ingress"
  security_group_id = aws_security_group.sherlihyDotCom_instance.id

  from_port   = "22"
  to_port     = "22"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "ingress_port_list" {
    count = length(var.ingress_port_list)
  type              = "ingress"
  security_group_id = aws_security_group.sherlihyDotCom_instance.id

  from_port   = var.ingress_port_list[count.index]
  to_port     = var.ingress_port_list[count.index]
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "egress_all_ports" {
  type              = "egress"
  security_group_id = aws_security_group.sherlihyDotCom_instance.id

  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

resource "aws_instance" "sherlihyDotCom_instance" {
  tags = var.resource_tags
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  subnet_id = var.subnet_id
    associate_public_ip_address = true

  vpc_security_group_ids = [aws_security_group.sherlihyDotCom_instance.id]

  key_name = var.key_name
}
