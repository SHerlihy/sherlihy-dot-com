#! /bin/bash

USER_NAME = $1
INIT_ROLE_ARN = $2

RESOURCE_TAGS = $3

DOMAIN_NAME = $4

echo -e "user_name = $USER_NAME\n" > ./bucket/init_roles/vars.tfvars
echo -e "init_role_arn = $INIT_ROLE_ARN\n" >> ./bucket/init_roles/vars.tfvars

echo -e "user_name = $USER_NAME\n" > ./bucket/s3_bucket/vars.tfvars
echo -e "resource_tags = $RESOURCE_TAGS\n" >> ./bucket/s3_bucket/vars.tfvars

echo -e "user_name = $USER_NAME\n" > ./bucket/upload_s3/init_vars.tfvars
echo -e "resource_tags = $RESOURCE_TAGS\n" >> ./bucket/upload_s3/init_vars.tfvars

cd ./bucket
./deploy.sh

STATUS=$?
if [ $STATUS -gt 0 ]
then
    echo "create bucket failed"
    exit $STATUS
fi

cd ../

echo -e "user_name = $USER_NAME\n" > ./distribute/init_roles/vars.tfvars
echo -e "init_role_arn = $INIT_ROLE_ARN\n" >> ./distribute/init_roles/vars.tfvars

echo -e "user_name = $USER_NAME\n" > ./distribute/create_distribution/vars.tfvars
echo -e "domain_name = $DOMAIN_NAME\n" >> ./distribute/create_distribution/vars.tfvars
echo -e "resource_tags = $RESOURCE_TAGS\n" >> ./distribute/create_distribution/vars.tfvars

terraform output -state=./bucket/s3_bucket/terraform.tfstate domain_name \
    | awk '{print "bucket_domain_name = "$1}' \
    >> ./distribute/create_distribution/vars.tfvars

cd ./distribute
./create_distribution.sh

STATUS=$?
if [ $STATUS -gt 0 ]
then
    echo "create distribution failed"
    exit $STATUS
fi
cd ../

exit
