#! /bin/bash

FILE=$1

awk -f extract_diagram.awk $1.html > $1.md
mmdc -c md_to_svg_config.json -i $1.md -o $1.svg
