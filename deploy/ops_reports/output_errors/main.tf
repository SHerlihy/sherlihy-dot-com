variable "rate" {
    type = string
}

variable "distribution_id" {
  type = string
}

variable "database_name" {
  type = string
}

variable "table_name" {
  type = string
}

variable "output_bucket" {
  type = string
}

resource "aws_athena_workgroup" "ops_analysis" {
  force_destroy = true
  name          = "ops_analysis"

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true

    result_configuration {
      output_location = "s3://${var.output_bucket}/status-errors/"
    }
  }
}

resource "aws_athena_named_query" "status_by_category" {
  name      = "status_by_category"
  workgroup = aws_athena_workgroup.ops_analysis.id
  database  = var.database_name
  query     = <<EOF
SELECT 
    CASE 
        WHEN status BETWEEN 200 AND 299 THEN '2xx Success'
        WHEN status BETWEEN 300 AND 399 THEN '3xx Redirection'
        WHEN status BETWEEN 400 AND 499 THEN '4xx Client Error'
        WHEN status BETWEEN 500 AND 599 THEN '5xx Server Error'
        ELSE 'Other'
    END AS status_category,
    status AS http_status,
    COUNT(*) AS total_requests,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM 
    ${var.database_name}.${var.table_name}
WHERE
    distributionid = '${var.distribution_id}'
    AND (
        (
            year = date_format(current_date, '%Y')
            AND month = date_format(current_date, '%m')
            AND day = date_format(current_date, '%d')
        ) OR (
            year = date_format(current_date - INTERVAL '1' DAY, '%Y')
            AND month = date_format(current_date - INTERVAL '1' DAY, '%m')
            AND day = date_format(current_date - INTERVAL '1' DAY, '%d')
        )
    )
    AND parse_datetime(concat(CAST(date AS varchar), ' ', time), 'yyyy-MM-dd HH:mm:ss')
        >= current_timestamp - INTERVAL '${var.rate}' HOUR
GROUP BY 
    1, 2
ORDER BY 
    total_requests DESC;
EOF
}

output "query_id" {
  value = aws_athena_named_query.status_by_category.id
}
