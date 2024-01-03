variable "domain_name" {
    type = string
}

variable "content_public_dns" {
    type = string
}

variable "cert_arn" {
    type = string
}

variable "resource_tags" {
    type = map(string)
    default = {}
}
