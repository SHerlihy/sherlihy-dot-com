#! /bin/bash

awk -i inplace '/^.*VITE_IMGS_PATH.*$/d' ../../application/.env.staging

echo "VITE_IMGS_PATH=''" > ../../application/.env.staging
