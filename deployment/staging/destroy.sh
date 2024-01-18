#! /bin/bash

cd ./upload_s3
./delete_files.sh
cd ../

cd ./faux_upload_s3
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

cd ./faux_replace_role
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

cd ./s3_bucket
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

cd ./init_roles
terraform destroy --auto-approve
cd ../

exit
