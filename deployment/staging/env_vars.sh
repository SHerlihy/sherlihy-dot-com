#! /bin/bash

awk -i inplace '/^.*VITE_IMGS_PATH.*$/d' ../../../.env.staging

echo "VITE_IMGS_PATH=''" > ../../../.env.staging
