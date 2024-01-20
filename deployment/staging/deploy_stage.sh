#! /bin/bash

USER_NAME="\"sherlihyDotCom-staging\""
INIT_ROLE_ARN="\"arn:aws:iam::111644099040:role/sherlihyDotCom-staging-iam\""

RESOURCE_TAGS="{\n\"project\"=\"sherlihyDotCom\"\n\"env\"=\"stage\"\n}"

DOMAIN_NAME="\"stagestaging.click\""

./deploy_prod.sh $USER_NAME $INIT_ROLE_ARN $RESOURCE_TAGS $DOMAIN_NAME
