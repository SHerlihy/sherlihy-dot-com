terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

resource "aws_eip" "nat_gw-ip" {}

resource "aws_nat_gateway" "nat-pub_pvt" {
  allocation_id = aws_eip.nat_gw-ip.id
  subnet_id     = var.pub_subnet_id

  connectivity_type = "public"
}

resource "aws_route_table" "nat_gw-public_private" {
  vpc_id = var.vpc_id
}

resource "aws_route" "nat_gw" {
  route_table_id         = aws_route_table.nat_gw-public_private.id
  destination_cidr_block = "0.0.0.0/0"

  nat_gateway_id = aws_nat_gateway.nat-pub_pvt.id
}

resource "aws_route_table_association" "nat_gw-private" {
  subnet_id      = var.pvt_subnet_id
  route_table_id = aws_route_table.nat_gw-public_private.id
}
