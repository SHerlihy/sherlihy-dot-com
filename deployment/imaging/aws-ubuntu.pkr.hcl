packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = "~> 1"
    }
  }
}

locals {
  timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}

source "amazon-ebs" "sherlihy-dot-com" {
  //AMI Conf:
  // 09/23 ami_users by default creator is user
  ami_name    = format("%s/%s", "sherlihy-dot-com", local.timestamp)
  ami_regions = ["eu-west-2"]

  //Access Conf:

  region = "eu-west-2"

  //Run Conf:
  instance_type = "t2.micro"
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }

  //Communicator Conf:
  ssh_username = "ubuntu"
}

build {
  name = "sherlihy-dot-com"
  sources = [
    "source.amazon-ebs.sherlihy-dot-com"
  ]

  provisioner "shell" {
    inline = [
      "mkdir /home/ubuntu/dist",
    ]
  }

  provisioner "file" {
    source      = "./dist/"
    destination = "/home/ubuntu/dist/"
  }

  provisioner "file" {
    source      = "./deployment/provision_scripts/config_server.sh"
    destination = "~/config_server.sh"
  }

  provisioner "file" {
    source      = "./deployment/provision_scripts/position_files.sh"
    destination = "~/position_files.sh"
  }

  provisioner "shell" {
    inline = [
      "sudo bash ~/config_server.sh"
    ]
  }

//  provisioner "shell" {
//    inline = [
//      "sudo bash ~/position_files.sh"
//    ]
//  }
}
