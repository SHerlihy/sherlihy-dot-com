#!/bin/bash

sudo nohup busybox httpd -f -p 80 -p 443 &
