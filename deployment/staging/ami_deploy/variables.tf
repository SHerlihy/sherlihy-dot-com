variable "TLS_cert_arn" {
  type    = string
  default = "arn:aws:acm:eu-west-2:111644099040:certificate/180c3701-3923-4407-9613-9d9a04d1dca9"
}

variable "zone_id" {
    type = string
    default = "Z09371153JJQNMQZW376"
}

variable "domain_name" {
    type = string
    default = "stagestaging.click"
}
