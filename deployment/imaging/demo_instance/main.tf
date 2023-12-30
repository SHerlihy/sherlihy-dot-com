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
  source = "../../modules/site_instance"

  vpc_id    = aws_default_vpc.default.id
  subnet_id = aws_default_subnet.default_az1.id

  ingress_port_list = tolist([80, 443])

  key_name = aws_key_pair.sherlihyDotCom_instance.key_name
}

resource "terraform_data" "provision_servers" {
  connection {
    type = "ssh"
    port = "22"

    host = module.web_server_instance.instance_ip
    user = module.web_server_instance.instance_user

    private_key = file("./.ssh/id_rsa")

    timeout = "2m"
  }

  provisioner "remote-exec" {
    inline = [
      "mkdir /home/ubuntu/dist",
      "mkdir /home/ubuntu/bake_scripts",
      "mkdir /home/ubuntu/configuration_scripts",
    ]
  }

  provisioner "file" {
    source      = "../../../dist/"
    destination = "/home/ubuntu/dist/"
  }

  provisioner "file" {
    source      = "../../provision_scripts/"
    destination = "/home/ubuntu/bake_scripts/"
  }

  provisioner "file" {
    source      = "../../configuration_scripts/"
    destination = "/home/ubuntu/configuration_scripts/"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo bash /home/ubuntu/bake_scripts/bake_server.sh",
      "sudo bash /home/ubuntu/configuration_scripts/web_server-init.sh"
    ]
  }
}

output "instance_user" {
  value = "ubuntu"
}

output "instance_ip" {
  value = module.web_server_instance.instance_ip
}
