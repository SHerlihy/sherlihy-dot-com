import json
import os
import time

import boto3


athena = boto3.client("athena")
sns = boto3.client("sns")


POLL_SECONDS = 5
MAX_WAIT_SECONDS = 240
ERROR_CATEGORIES = {"4xx Client Error", "5xx Server Error"}


def lambda_handler(event, context):
    named_query_id = os.environ["ATHENA_NAMED_QUERY_ID"]
    topic_arn = os.environ["SNS_TOPIC_ARN"]
    query_execution_id = "not-started"

    try:
        response = athena.get_named_query(NamedQueryId=named_query_id)
        named_query = response["NamedQuery"]

        query_execution = {
            "QueryString": named_query["QueryString"],
            "QueryExecutionContext": {
                "Database": named_query["Database"],
            },
        }

        workgroup = named_query.get("WorkGroup")
        if workgroup:
            query_execution["WorkGroup"] = workgroup

        execution = athena.start_query_execution(**query_execution)
        query_execution_id = execution["QueryExecutionId"]

        wait_for_query(query_execution_id)
        rows = read_query_rows(query_execution_id)
        report = build_error_report(rows, query_execution_id)
        publish_report(topic_arn, report)
    except Exception as exc:
        publish_failure(topic_arn, query_execution_id, exc)
        raise

    body = {
        "query_execution_id": query_execution_id,
        "named_query_id": named_query_id,
        "error_requests": report["error_requests"],
    }

    return {"statusCode": 200, "body": json.dumps(body)}


def wait_for_query(query_execution_id):
    elapsed = 0
    while elapsed <= MAX_WAIT_SECONDS:
        response = athena.get_query_execution(QueryExecutionId=query_execution_id)
        status = response["QueryExecution"]["Status"]
        state = status["State"]

        if state == "SUCCEEDED":
            return

        if state in {"FAILED", "CANCELLED"}:
            reason = status.get("StateChangeReason", "No reason provided")
            raise RuntimeError(f"Athena query {state.lower()}: {reason}")

        time.sleep(POLL_SECONDS)
        elapsed += POLL_SECONDS

    raise TimeoutError(f"Athena query did not finish within {MAX_WAIT_SECONDS} seconds")


def read_query_rows(query_execution_id):
    rows = []
    paginator = athena.get_paginator("get_query_results")

    for page in paginator.paginate(QueryExecutionId=query_execution_id):
        for row in page["ResultSet"]["Rows"]:
            rows.append([cell.get("VarCharValue", "") for cell in row.get("Data", [])])

    if not rows:
        return []

    headers = rows[0]
    return [dict(zip(headers, row)) for row in rows[1:]]


def build_error_report(rows, query_execution_id):
    error_rows = [row for row in rows if row.get("status_category") in ERROR_CATEGORIES]
    error_requests = sum(parse_int(row.get("total_requests")) for row in error_rows)
    total_requests = sum(parse_int(row.get("total_requests")) for row in rows)

    lines = [
        "CloudFront HTTP error count report",
        "",
        f"Query execution ID: {query_execution_id}",
        f"Total requests: {total_requests}",
        f"Error requests: {error_requests}",
        "",
        "Error status breakdown:",
    ]

    if error_rows:
        for row in error_rows:
            lines.append(
                "{status_category} / {http_status}: {total_requests} requests ({percentage}%)".format(
                    status_category=row.get("status_category", "Unknown"),
                    http_status=row.get("http_status", "Unknown"),
                    total_requests=row.get("total_requests", "0"),
                    percentage=row.get("percentage", "0"),
                )
            )
    else:
        lines.append("No 4xx or 5xx responses found in the query window.")

    return {
        "error_requests": error_requests,
        "message": "\n".join(lines),
        "subject": f"CloudFront error count: {error_requests}",
    }


def publish_report(topic_arn, report):
    sns.publish(
        TopicArn=topic_arn,
        Subject=report["subject"],
        Message=report["message"],
    )


def publish_failure(topic_arn, query_execution_id, exc):
    sns.publish(
        TopicArn=topic_arn,
        Subject="CloudFront error count query failed",
        Message=(
            "The scheduled Athena query could not produce an HTTP error count report.\n\n"
            f"Query execution ID: {query_execution_id}\n"
            f"Error: {exc}"
        ),
    )


def parse_int(value):
    try:
        return int(value or 0)
    except ValueError:
        return 0
