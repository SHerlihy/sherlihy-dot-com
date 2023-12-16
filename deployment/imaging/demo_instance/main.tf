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

resource "aws_security_group" "demo_instance" {
  name   = "demo_instance"
  vpc_id = aws_default_vpc.default.id
}

resource "aws_security_group_rule" "ingress_ssh" {
  type              = "ingress"
  security_group_id = aws_security_group.demo_instance.id

  from_port   = "22"
  to_port     = "22"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "ingress_http" {
  type              = "ingress"
  security_group_id = aws_security_group.demo_instance.id

  from_port   = "80"
  to_port     = "80"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "egress_all_ports" {
  type              = "egress"
  security_group_id = aws_security_group.demo_instance.id

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

resource "aws_key_pair" "ubuntu" {
  key_name   = "ubuntu"
  public_key = file("./.ssh/id_rsa.pub")
}

resource "aws_instance" "demo_instance" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  subnet_id = aws_default_subnet.default_az1.id

  vpc_security_group_ids = [aws_security_group.demo_instance.id]

  key_name = aws_key_pair.ubuntu.key_name

  tags = {
    Name = "sherlihy_dot_com-demo_instance"
  }
}

resource "terraform_data" "provision_server" {
  connection {
    type = "ssh"
    port = "22"

    host = aws_instance.demo_instance.public_ip
    user = "ubuntu"

    private_key = file("./.ssh/id_rsa")

    timeout = "2m"
  }

  provisioner "remote-exec" {
    inline = [
      "mkdir /home/ubuntu/dist",
      "mkdir /home/ubuntu/provision_scripts",
      "mkdir /home/ubuntu/configuration_scripts",
    ]
  }

  provisioner "file" {
    source      = "../../../dist/"
    destination = "/home/ubuntu/dist/"
  }

  provisioner "file" {
    source      = "../provision_scripts/"
    destination = "/home/ubuntu/provision_scripts/"
  }

  provisioner "file" {
    source      = "../../configuration_scripts/"
    destination = "/home/ubuntu/configuration_scripts/"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo bash /home/ubuntu/provision_scripts/config_server.sh",
      "sudo bash /home/ubuntu/provision_scripts/position_files.sh",
      "sudo bash /home/ubuntu/configuration_scripts/web_server-init.sh"
    ]
  }
}

output "instance_user" {
  value = "ubuntu"
}

output "instance_ip" {
  value = aws_instance.demo_instance.public_ip
}
