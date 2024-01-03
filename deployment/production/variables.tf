variable "domain_name" {
    type = string
    default = "sherlihy.com"
}

variable "dist_files" {
  type = list(object({
            path: string
            type: string
            })
        )
}
