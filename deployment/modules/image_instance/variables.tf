variable "vpc_id" {
    type = string
}

variable "subnet_id" {
    type = string
}

variable "ingress_port_list" {
    type = list(number)
}

variable "key_name" {
    type = string
}

variable "init_file_path" {
    type = string
}
