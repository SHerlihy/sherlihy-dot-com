#! /bin/bash

terraform apply -auto-approve ./tf.plan

awk -i inplace '/^.*VITE_IMGS_PATH.*$/d' ../../../.env.staging

#S3_DOMAIN=$(terraform output bucket_domain_name)
echo "VITE_IMGS_PATH=''" > ../../../.env.staging

exit
