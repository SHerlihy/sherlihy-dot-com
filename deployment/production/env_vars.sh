#! /bin/bash

awk -i inplace '/^.*VITE_IMGS_PATH.*$/d' ../../application/.env.production

echo "VITE_IMGS_PATH=''" > ../../application/.env.production
