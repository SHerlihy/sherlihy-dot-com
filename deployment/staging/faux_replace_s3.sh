#! /bin/bash

cd ./faux_replace_role
terraform init
terraform apply --auto-approve
terraform output > ../faux_upload_s3/vars.tfvars
cd ../

terraform -chdir=./s3_bucket output bucket_id \
    | awk '{print "\nbucket_id = "$1}' \
    >> ./faux_upload_s3/vars.tfvars

cd ./faux_upload_s3
./replace_files.sh

STATUS=$?

if [ $STATUS -gt 0 ]
then
    echo "replace failed"
    exit $STATUS
fi

cd ../

exit
