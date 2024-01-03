variable "dist_files" {
  type = list(object({
            path: string
            type: string
            })
        )
}
