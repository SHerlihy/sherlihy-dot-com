variable "profile" {
    type = string
}

variable "bucket_create_arn" {
    type = string
}

variable "obj_replace_name" {
    type = string
}

variable "obj_replace_arn" {
    type = string
}

variable "resource_tags" {
    type = map(string)
}
