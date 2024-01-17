#! /bin/bash

terraform init
terraform apply -auto-approve

sleep 1

terraform output > ../s3_bucket/vars.tfvars

cd ../s3_bucket
terraform init
terraform apply -var-file='./vars.tfvars' -auto-approve
cd ../

terraform -chdir=./init_deploy output > ./upload_s3/vars.tfvars
terraform -chdir=./s3_bucket output >> ./upload_s3/vars.tfvars

cd ./upload_s3
./replace_files.sh

exit
