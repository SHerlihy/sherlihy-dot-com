#! /bin/bash

cd ./distribute
./destroy.sh
cd ../

cd ./bucket
./destroy.sh
cd ../

exit
