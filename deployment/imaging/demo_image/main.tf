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

resource "aws_key_pair" "sherlihyDotCom_instance" {
  key_name   = "sherlihyDotCom-instance"
  public_key = file("./.ssh/id_rsa.pub")
}

module "web_server_instance" {
  source = "../../modules/image_instance"

  vpc_id    = aws_default_vpc.default.id
  subnet_id = aws_default_subnet.default_az1.id

  ingress_port_list = tolist([80, 443])

  key_name = aws_key_pair.sherlihyDotCom_instance.key_name

    init_file_path = "../../configuration_scripts/web_server-init.sh"
}

output "instance_user" {
  value = "ubuntu"
}

output "instance_ip" {
  value = module.web_server_instance.instance_ip
}
