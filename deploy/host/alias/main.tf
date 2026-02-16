terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

variable "web_domain" {
  type = string
}

variable "route_zone_id" {
  type = string
}

variable "cdn_domain" {
  type = string
}

variable "cdn_zone_id" {
  type = string
}

resource "aws_route53_record" "sherlihyDotCom" {
    zone_id = var.route_zone_id
    name    = var.web_domain
    type    = "A"
    
    alias {
        name = var.cdn_domain
        zone_id = var.cdn_zone_id 
        evaluate_target_health = true
    }
}
