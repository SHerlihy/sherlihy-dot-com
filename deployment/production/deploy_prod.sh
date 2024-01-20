#! /bin/bash

USER_NAME="\"sherlihyDotCom-prod\""
INIT_ROLE_ARN="\"arn:aws:iam::111644099040:role/sherlihyDotCom-prod-iam\""

RESOURCE_TAGS="{\n\"project\"=\"sherlihyDotCom\"\n\"env\"=\"production\"\n}"

DOMAIN_NAME="\"sherlihy.com\""

./deploy.sh $USER_NAME $INIT_ROLE_ARN $RESOURCE_TAGS $DOMAIN_NAME
