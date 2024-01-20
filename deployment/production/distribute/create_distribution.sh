#! /bin/bash

cd ./init_roles
terraform init
terraform apply -var-file=./vars.tfvars --auto-aprove

STATUS=$?
if [ $STATUS -gt 0 ]
then
    echo "create distribution roles failed"
    exit $STATUS
fi
cd ../

terraform output -state=./init_roles/terraform.tfstate \
    >> ./create_distribution/vars.tfvars
echo -e "\n" >> ./create_distribution/vars.tfvars

cd ./create_distribution
terraform init
terraform apply -var-file=vars.tfvars --auto-aprove

STATUS=$?
if [ $STATUS -gt 0 ]
then
    echo "create distribution infra failed"
    exit $STATUS
fi
cd ../

exit
