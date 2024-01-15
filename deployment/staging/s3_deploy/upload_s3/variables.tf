variable "profile" {
    type = string
}

variable "role_arn" {
    type = string
}

variable "bucket_id" {
    type = string
}

variable "dist_files" {
  type = list(object({
            path: string
            type: string
            })
        )
}
