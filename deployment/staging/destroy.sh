#! /bin/bash

cd ./upload_s3
./delete_files.sh
cd ../

cd ./s3_bucket
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

cd ./init_roles
terraform destroy --auto-approve
cd ../

exit
