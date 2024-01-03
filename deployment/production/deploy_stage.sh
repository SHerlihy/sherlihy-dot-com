#! /bin/bash

#        "stage_s3": "cd ./deployment/s3_deploy && terraform apply -var-file=\"./s3_vars.tfvars\"",
#        "unstage_s3": "cd ./deployment/s3_deploy && terraform destroy -var-file=\"./s3_vars.tfvars\""

#terraform destroy -var-file=./plan_vars.tfvars
terraform apply -auto-approve ./tf.plan

exit
