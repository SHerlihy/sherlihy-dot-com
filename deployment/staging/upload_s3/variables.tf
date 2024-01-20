variable "obj_replace_arn" {
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

variable "resource_tags" {
    type = map(string)
}
