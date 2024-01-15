#! /bin/bash

terraform -chdir=../init_deploy output profile \
    | awk '{print "profile = "$1} END { printf "\n" }' \
    > ./vars.tfvars

terraform -chdir=../init_deploy output resource_tags \
    | awk '!/^{/' \
    | awk '!/^}/' \
    | awk -f ./resource_tags_to_list.awk >> ./vars.tfvars

terraform init
terraform apply -var-file='./vars.tfvars' -auto-approve

sleep 1

PROFILE=$(terraform -chdir=../init_deploy output profile)
ROLE_ARN=$(terraform output role_arn)
BUCKET_ID=$(terraform -chdir=../s3_bucket output bucket_id)

cd ../upload_s3
./replace_files.sh $PROFILE $BUCKET_ID $ROLE_ARN

exit
