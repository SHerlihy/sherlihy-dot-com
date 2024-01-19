#! /bin/bash

awk -i inplace '/^.*VITE_IMGS_PATH.*$/d' ../../../.env.production

echo "VITE_IMGS_PATH=''" > ../../../.env.production
