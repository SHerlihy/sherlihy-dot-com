#! /bin/bash

terraform apply -auto-approve ./tf.plan

npm run build_stage

cd ./upload_s3
./upload_files.sh

exit
