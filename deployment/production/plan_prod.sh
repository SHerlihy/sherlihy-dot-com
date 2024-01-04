#! /bin/bash

rm -rf .ssh

mkdir .ssh
ssh-keygen -q -f ./.ssh/id_rsa -N '' -t rsa

find ../../dist -type f > ./content_s3/dist_file_paths.txt 
awk -f ./content_s3/dist_paths_to_list.awk ./content_s3/dist_file_paths.txt > ./plan_vars.tfvars

echo -e "\ndomain_name = \"sherlihy.com\"" >> ./plan_vars.tfvars
#echo -e "\ndomain_name = \"stagestaging.click\"" >> ./plan_vars.tfvars

terraform init -input=false

terraform destroy -var-file=./plan_vars.tfvars -auto-approve 
terraform plan -var-file=./plan_vars.tfvars -out=./tf.plan

exit
