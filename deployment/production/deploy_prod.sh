#! /bin/bash

cd ./bucket
./deploy.sh
cd ../

terraform output -state=./bucket/s3_bucket/terraform.tfstate domain_name \
    | awk '{print "bucket_domain_name = "$1}' \
    > ./distribute/vars.tfvars

cd ./distribute
terraform init
terraform apply -var-file=./vars.tfvars --auto-approve
cd ../

exit
