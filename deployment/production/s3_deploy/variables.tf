variable "dist_files" {
  type = list(object({
            path: string
            type: string
            })
        )
}

variable "dist_dir_path" {
    type = string
}

variable "domain_name" {
    type = string
}

variable "cert_arn" {
    type = string
}
