#! /bin/bash

cd ./init_deploy
terraform init
terraform apply -auto-approve
cd ../

sleep 1

terraform -chdir=./init_deploy output > ./s3_bucket/vars.tfvars

cd ./s3_bucket
terraform init
terraform apply -var-file='./vars.tfvars' -auto-approve
cd ..

PROFILE=$(terraform -chdir=./init_deploy output profile)
ROLE_ARN=$(terraform -chdir=./init_deploy output role_arn)
BUCKET_ID=$(terraform -chdir=./s3_bucket output bucket_id)

cd ./upload_s3
./replace_files.sh $PROFILE $BUCKET_ID $ROLE_ARN

exit
