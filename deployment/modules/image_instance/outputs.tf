output "instance_id" {
    value = aws_instance.sherlihyDotCom_instance.id
}

output "subnet_id" {
    value = var.subnet_id
}

output "instance_user" {
  value = "ubuntu"
}

output "instance_ip" {
  value = aws_instance.sherlihyDotCom_instance.public_ip
}
