#! /bin/bash

npm run build

terraform init -input=false

find ../../../../dist -type f > ./dist_file_paths.txt 

awk -f ./dist_paths_to_list.awk ./dist_file_paths.txt >> ./vars.tfvars
echo -e "\n" >> ./vars.tfvars

terraform plan -var-file=./vars.tfvars
STATUS=$?

if [ $STATUS -gt 0 ]
then
    echo "plan failed"
    exit $STATUS
fi

terraform destroy -auto-approve -var-file=./vars.tfvars
terraform apply -var-file=./vars.tfvars -auto-approve

STATUS=$?

if [ $STATUS -gt 0 ]
then
    echo "apply failed"
    exit $STATUS
fi

exit 0
