variable "user_name" {
    type = string
    }

variable "resource_tags" {
    type = map(string)
    }

variable "distribute_create_arn" {
    type = string
}

variable "bucket_domain_name" {
    type = string
}

variable "domain_name" {
    type = string
}
