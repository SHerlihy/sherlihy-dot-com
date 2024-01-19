#! /bin/bash

cd ../
./env_vars.sh
cd ./bucket

terraform -chdir=./init_roles output > ./upload_s3/vars.tfvars

terraform -chdir=./s3_bucket output >> ./upload_s3/vars.tfvars

cd ./upload_s3
./replace_files.sh

STATUS=$?

if [ $STATUS -gt 0 ]
then
    echo "replace failed"
    exit $STATUS
fi

cd ../

exit
