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
