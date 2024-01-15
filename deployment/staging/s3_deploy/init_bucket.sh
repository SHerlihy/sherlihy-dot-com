#! /bin/bash

terraform init
terraform apply -auto-approve
terraform output > vars.tfvars

cd ./s3_bucket
terraform init
terraform apply -var-file='../vars.tfvars' -auto-approve

exit
