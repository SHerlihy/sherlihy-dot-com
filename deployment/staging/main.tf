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

resource "aws_vpc" "sherlihy_dot_com" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "sherlihy_dot_com" {
  vpc_id = aws_vpc.sherlihy_dot_com.id
}

resource "aws_subnet" "publics" {
    count = 2
  vpc_id     = aws_vpc.sherlihy_dot_com.id
  cidr_block = "10.0.${count.index+1}.0/24"

  availability_zone = data.aws_availability_zones.available.names[count.index]
}

resource "aws_route_table" "inet_gw-publics" {
  vpc_id = aws_vpc.sherlihy_dot_com.id
}

resource "aws_route" "inet_gw" {
  route_table_id         = aws_route_table.inet_gw-publics.id
  destination_cidr_block = "0.0.0.0/0"

  gateway_id = aws_internet_gateway.sherlihy_dot_com.id
}

resource "aws_route_table_association" "inet_gw-publics" {
    count = length(aws_subnet.publics)

  subnet_id      = aws_subnet.publics[count.index].id
  route_table_id = aws_route_table.inet_gw-publics.id
}

resource "aws_key_pair" "sherlihyDotCom_instance" {
  key_name   = "sherlihyDotCom-instance"
  public_key = file("./.ssh/id_rsa.pub")
}

module "web_server_instance" {
    count = length(aws_subnet.publics)
  source = "../modules/site_instance"

  vpc_id    = aws_vpc.sherlihy_dot_com.id
  subnet_id      = aws_subnet.publics[count.index].id

  ingress_port_list = tolist([80, 443])

    key_name = aws_key_pair.sherlihyDotCom_instance.key_name
}

resource "terraform_data" "provision_servers" {
    count = length(module.web_server_instance)

  connection {
    type = "ssh"
    port = "22"

        host = module.web_server_instance[count.index].instance_ip
        user = module.web_server_instance[count.index].instance_user

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
    source      = "../../dist/"
    destination = "/home/ubuntu/dist/"
  }

  provisioner "file" {
    source      = "../provision_scripts/"
    destination = "/home/ubuntu/bake_scripts/"
  }

  provisioner "file" {
    source      = "../configuration_scripts/"
    destination = "/home/ubuntu/configuration_scripts/"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo bash /home/ubuntu/bake_scripts/bake_server.sh",
      "sudo bash /home/ubuntu/configuration_scripts/web_server-init.sh"
    ]
  }
}

locals {
    subnet_ids = [for subnet in aws_subnet.publics : subnet.id]
    instance_ids = [for instance in module.web_server_instance : instance.instance_id]
}

module "lb_tls_proxy" {
    source = "../modules/lb_tls_proxy"

  vpc_id    = aws_vpc.sherlihy_dot_com.id

  ingress_port_list = tolist([80, 443])

    instance_ids = local.instance_ids
    subnet_ids = local.subnet_ids

    target_port = 80
    TLS_cert_arn = var.TLS_cert_arn
}
