#! /bin/bash

#awk -i inplace '/^.*VITE_IMGS_PATH.*$/d' ../../../.env.staging
#
#echo "VITE_IMGS_PATH=''" > ../../../.env.staging
#
#npm run build_stage

terraform init -input=false

find ../../../dist -type f > ./dist_file_paths.txt 

echo -e "\n" >> ./vars.tfvars
awk -f ./dist_paths_to_list.awk ./dist_file_paths.txt >> ./vars.tfvars

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
