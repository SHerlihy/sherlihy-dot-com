#! /bin/bash

cd ./upload_s3
./delete_files.sh

cd ../

terraform destroy -auto-approve

exit
