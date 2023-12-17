#! /bin/bash

terraform init -input=false
terraform destroy -auto-approve
terraform plan -out=./tf.plan
terraform apply -auto-approve ./tf.plan
