variable "vpc_id" {
    type = string
}

variable "ingress_port_list" {
    type = list(number)
}

variable "target_port" {
    type = number
}

variable "TLS_cert_arn" {
    type = string
}

variable "subnet_ids" {
    type = list(string)
}

variable "instance_ids" {
    type = list(string)
}
