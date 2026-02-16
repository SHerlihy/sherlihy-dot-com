#!/bin/sh

terraform output -json | jq 'map_values(.value)' > ./terraform.tfvars.json
