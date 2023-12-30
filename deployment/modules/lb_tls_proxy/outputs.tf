output "dns_name" {
    value = aws_lb.inet-server.dns_name
}

output "zone_id" {
    value = aws_lb.inet_access.zone_id
}
