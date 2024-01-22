#! /bin/bash

declare -a FILE_NAMES=$(ls \
    | grep '^.*\.html$' \
    | awk -f ./cr_separated-array.awk)

for FILE_NAME in "${FILE_NAMES[@]}"
do
    if test "$FILE_NAME.html" > 0 == true
    then
        echo "$FILE_NAME.html not found"
        continue
    fi

    echo "$FILE_NAME"
    ./html_to_svg.sh $FILE_NAME
done

for FILE_NAME in "${FILE_NAMES[@]}"
do
    awk -i inplace -f ./delete_infrastructure_diagrams.awk ../../README.md
    FILE_NAME+=".md"
    MD_CONTENT=$(cat $FILE_NAME)
    awk -i inplace -v infraDiagram="${MD_CONTENT}" -f ./add_infra_diagram.awk ../../README.md
done
