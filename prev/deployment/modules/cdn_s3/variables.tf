variable "bucket_domain_name" {
    type = string
}

variable "alias_domain_name" {
    type = string
}

variable "origin_id" {
    type = string
}

variable "cert_arn" {
    type = string
}

variable "resource_tags" {
    type = map(string)
    default = {}
}
