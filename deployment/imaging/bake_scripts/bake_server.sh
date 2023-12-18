#!/bin/bash

sudo dpkg --configure -a
find /var/lib/apt/lists -type f  |xargs rm -f >/dev/null \
sudo apt -y update

sudo dpkg --remove apache2

sudo apt-get -y install -f
sudo apt -f -y install apache2

sudo rm /var/www/html/index.html
sudo mv /home/ubuntu/dist/* /var/www/html
