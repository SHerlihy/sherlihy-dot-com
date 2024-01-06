#! /bin/bash

awk -i inplace '/^.*VITE_IMGS_PATH.*$/d' ../../../.env.production

echo "VITE_IMGS_PATH=''" > ../../../.env.production

npm run build

terraform init -input=false

find ../../../dist -type f > ./dist_file_paths.txt 
awk -f ./dist_paths_to_list.awk ./dist_file_paths.txt > ./upload_vars.tfvars

BUCKET_ID=$(terraform -chdir=../ output bucket_id)
echo -e "\nbucket_id=$BUCKET_ID" >> ./upload_vars.tfvars

terraform destroy -auto-approve -var-file=./upload_vars.tfvars

terraform plan -var-file=./upload_vars.tfvars -out=./upload.plan

terraform apply -auto-approve ./upload.plan

exit
