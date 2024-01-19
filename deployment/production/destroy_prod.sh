#! /bin/bash

cd ./distribute
terraform destroy -var-file=./vars.varfile --auto-approve
cd ../

cd ./bucket
./destroy.sh
cd ../

exit
