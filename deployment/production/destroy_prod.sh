#! /bin/bash

terraform apply -auto-approve ./tf.plan

cd ./upload_s3
./delete_files.sh

exit
