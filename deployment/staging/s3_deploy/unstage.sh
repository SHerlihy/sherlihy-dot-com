#! /bin/bash

cd ./upload
./delete_files.sh

cd ..
terraform destroy -auto-approve

exit
