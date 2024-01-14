#! /bin/bash

terraform apply -auto-approve ./tf.plan

cd ./upload_s3
./replace_files.sh

exit
