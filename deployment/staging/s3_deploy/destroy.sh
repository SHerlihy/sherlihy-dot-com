#! /bin/bash

cd ./upload_s3
./delete_files.sh
cd ../

cd ./s3_bucket
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

cd ./role_assumptions/init_deploy
terraform destroy --auto-approve
cd ../../

exit
