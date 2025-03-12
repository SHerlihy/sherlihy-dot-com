variable "bucket_id" {
    type = string
}

variable "dist_path" {
    type = string
}

variable "dist_files" {
  type = list(object({
            path: string
            type: string
            })
        )
}

variable "resource_tags" {
    type = map(string)
}
