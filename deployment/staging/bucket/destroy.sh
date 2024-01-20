#! /bin/bash

cd ./upload_s3
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

cd ./s3_bucket
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

cd ./init_roles
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

exit
