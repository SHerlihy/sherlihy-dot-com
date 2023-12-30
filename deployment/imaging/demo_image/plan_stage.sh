#! /bin/bash

mkdir .ssh
ssh-keygen -q -f ./.ssh/id_rsa -N '' -t rsa

terraform init -input=false
terraform plan -out=./tf.plan

exit
