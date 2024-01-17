#! /bin/bash

terraform init
terraform apply -auto-approve

STATUS=$?

if [ $STATUS -gt 0 ]
then
    echo "create role failed"
    exit $STATUS
fi

sleep 1

terraform output > ../upload_s3/vars.tfvars
terraform -chdir=../s3_bucket output bucket_id \
    | awk '{print "\nbucket_id = "$1}' \
    >> ../upload_s3/vars.tfvars

cd ../upload_s3
./replace_files.sh

exit
