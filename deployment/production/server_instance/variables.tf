variable "pub_key_path" {
    type = string
}

variable "config_script_path" {
    type = string
}

variable "resource_tags" {
    type = map(string)
    default = {}
}
