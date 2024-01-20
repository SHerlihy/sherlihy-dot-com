#! /bin/bash

cd ./init_roles
terraform init
terraform apply -auto-approve

STATUS=$?
if [ $STATUS -gt 0 ]
then
    echo "role creation failed"
    exit $STATUS
fi

sleep 1

terraform output >> ../s3_bucket/vars.tfvars

cd ../

cd ./s3_bucket
terraform init
terraform apply -var-file='./vars.tfvars' -auto-approve

STATUS=$?
if [ $STATUS -gt 0 ]
then
    echo "create bucket failed"
    exit $STATUS
fi

cd ../

./replace_s3.sh

STATUS=$?
if [ $STATUS -gt 0 ]
then
    echo "s3 upload failed"
    exit $STATUS
fi

exit 0
