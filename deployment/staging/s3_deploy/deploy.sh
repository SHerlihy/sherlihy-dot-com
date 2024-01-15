#! /bin/bash

cd ./role_assumptions/init_deploy
terraform init
terraform apply -auto-approve
cd ../../

sleep 1

terraform -chdir=./role_assumptions/init_deploy output > ./s3_bucket/vars.tfvars

cd ./s3_bucket
terraform init
terraform apply -var-file='./vars.tfvars' -auto-approve
cd ..

PROFILE=$(terraform -chdir=./role_assumptions/init_deploy output profile)
BUCKET_ID=$(terraform -chdir=./s3_bucket output bucket_id)

cd ./upload_s3
./replace_files.sh $PROFILE $BUCKET_ID

exit
