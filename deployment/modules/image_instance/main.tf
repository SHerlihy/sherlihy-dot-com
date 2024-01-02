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

data "aws_ami" "sherlihy_dot_com" {
  most_recent = true
  owners      = ["111644099040"]

  filter {
    name   = "name"
    values = ["sherlihy-dot-com/*"]
  }
}

resource "aws_instance" "sherlihyDotCom_instance" {
  tags = var.resource_tags
  ami           = data.aws_ami.sherlihy_dot_com.id
  instance_type = "t2.micro"

  subnet_id = var.subnet_id

    vpc_security_group_ids = [aws_security_group.sherlihyDotCom_instance.id]

  user_data = file(var.init_file_path)

   associate_public_ip_address =  var.is_public
}
