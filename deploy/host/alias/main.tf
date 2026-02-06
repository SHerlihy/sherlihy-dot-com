terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

variable "domain_name" {
  type = string
}

variable "endpoint" {
  type = string
}
variable "zone_id" {
  type = string
}

resource "aws_route53_zone" "sherlihyDotCom" {
    name         = var.domain_name

    force_destroy = true
}

resource "aws_route53_record" "sherlihyDotCom" {
    zone_id = aws_route53_zone.sherlihyDotCom.zone_id
    name    = var.domain_name
    type    = "A"
    
    alias {
        name = var.endpoint
        zone_id = var.zone_id 
        evaluate_target_health = true
    }
}

output "name_servers" {
    value = aws_route53_zone.sherlihyDotCom.name_servers
}
