#! /bin/bash

# variables
Path="src/lib/components"

# Take User Input for Creating Component or deleting Component
echo "Enter 1 to create Component"
echo "Enter 2 to delete Component"
read choice

# if user input is 1 then create component

echo choice

echo $choice

if [ "$choice" -eq 1 ]; then
    echo "Creating Component"
    read -p "Enter Component Name: " NAME

    if [ -z "$NAME" ]; then
        echo "You did not Component Name"
    else
        # get Path of directory
        DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
        # get name of directory
        DIR_NAME=$(basename "$DIR")

        echo "Component Name: $NAME"
        mkdir -p $Path/$NAME
        touch $Path/$NAME/$NAME.jsx
        touch $Path/$NAME/$NAME.scss
        touch $Path/$NAME/$NAME.test.jsx
        touch $Path/$NAME/$NAME.stories.jsx

        echo "Component Created"

    fi
else
    echo "Deleting Component"
    read -p "Enter Component Name: " NAME
    rm -rf $Path/$NAME
fi
