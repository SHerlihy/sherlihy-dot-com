import json
import os

import boto3


athena = boto3.client("athena")


def lambda_handler(event, context):
    named_query_id = os.environ["ATHENA_NAMED_QUERY_ID"]

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

    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "query_execution_id": execution["QueryExecutionId"],
                "named_query_id": named_query_id,
            }
        ),
    }
