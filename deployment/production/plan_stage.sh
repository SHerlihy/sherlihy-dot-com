#! /bin/bash

find ../../dist -type f > ./s3_deploy/dist_file_paths.txt 
awk -f ./s3_deploy/dist_paths_to_list.awk ./s3_deploy/dist_file_paths.txt > ./plan_vars.tfvars

#echo "domain_name = sherlihy.com" > ./plan_vars.tfvars
echo -e "\ndomain_name = \"stagestaging.click\"" >> ./plan_vars.tfvars

terraform init -input=false
terraform plan -var-file=./plan_vars.tfvars -out=./tf.plan

exit
