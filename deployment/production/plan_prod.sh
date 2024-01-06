#! /bin/bash

rm -rf .ssh

mkdir .ssh
ssh-keygen -q -f ./.ssh/id_rsa -N '' -t rsa

echo -e "\ndomain_name = \"stagestaging.click\"" >> ./plan_vars.tfvars
#echo -e "\ndomain_name = \"sherlihy.com\"" >> ./plan_vars.tfvars

terraform init -input=false
terraform plan -var-file=./plan_vars.tfvars -out=./tf.plan

exit
