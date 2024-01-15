#! /bin/bash

PROFILE=$1
BUCKET_ID=$2

awk -i inplace '/^.*VITE_IMGS_PATH.*$/d' ../../../../.env.staging

echo "VITE_IMGS_PATH=''" > ../../../../.env.staging

npm run build_stage

terraform init -input=false

find ../../../../dist -type f > ./dist_file_paths.txt 
awk -f ./dist_paths_to_list.awk ./dist_file_paths.txt > ./upload_vars.tfvars

echo -e "\nbucket_id=$BUCKET_ID" >> ./upload_vars.tfvars
echo -e "\nprofile=$PROFILE" >> ./upload_vars.tfvars

terraform destroy -auto-approve -var-file=./upload_vars.tfvars
terraform plan -var-file=./upload_vars.tfvars -out=./upload.plan
terraform apply -auto-approve ./upload.plan

exit
