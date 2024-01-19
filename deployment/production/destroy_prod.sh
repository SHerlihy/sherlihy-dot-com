#! /bin/bash

cd ./distribute
terraform destroy -var-file=./vars.tfvars --auto-approve
cd ../

cd ./bucket
./destroy.sh
cd ../

exit
