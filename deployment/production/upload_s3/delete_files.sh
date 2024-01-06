#! /bin/bash

terraform destroy -auto-approve -var-file=./upload_vars.tfvars

exit
