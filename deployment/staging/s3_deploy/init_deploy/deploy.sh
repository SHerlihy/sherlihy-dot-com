#! /bin/bash

terraform init
terraform apply -auto-approve

STATUS=$?

if [ $STATUS -gt 0 ]
then
    echo "role creation failed"
    exit $STATUS
fi

sleep 1

terraform output > ../s3_bucket/vars.tfvars

cd ../s3_bucket

terraform init
terraform apply -var-file='./vars.tfvars' -auto-approve

STATUS=$?

if [ $STATUS -gt 0 ]
then
    echo "create bucket failed"
    exit $STATUS
fi

cd ../

terraform -chdir=./init_deploy output > ./upload_s3/vars.tfvars
terraform -chdir=./s3_bucket output >> ./upload_s3/vars.tfvars

cd ./upload_s3

./replace_files.sh

STATUS=$?

if [ $STATUS -gt 0 ]
then
    echo "s3 upload failed"
    exit $STATUS
fi

cd ../

exit 0
