#! /bin/bash

cd ./create_distribution
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

cd ./init_roles
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

exit
