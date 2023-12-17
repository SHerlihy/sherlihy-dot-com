#! /bin/bash

mkdir .ssh
ssh-keygen -q -f ./.ssh/id_rsa -N '' -t rsa

terraform init -input=false
terraform destroy -auto-approve
terraform plan -out=./tf.plan
terraform apply -auto-approve ./tf.plan

exit
