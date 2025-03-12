resource "aws_s3_object" "dist-to-objects" {
  count = length(var.dist_files)

  bucket = var.bucket_id
  key    = var.dist_files[count.index].path
source = "${var.dist_path}/${var.dist_files[count.index].path}"

  acl = "public-read"

    content_type = var.dist_files[count.index].type

    tags = var.resource_tags
}

