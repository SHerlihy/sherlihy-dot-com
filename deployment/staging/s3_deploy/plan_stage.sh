#! /bin/bash

terraform init -input=false
terraform plan -out=./tf.plan

exit
