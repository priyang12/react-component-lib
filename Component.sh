#! /bin/bash

# variables
Path="src/lib/components"

# Take User Input for Creating Component or deleting Component
echo "Enter 1 to create Component"
echo "Enter 2 to delete Component"
read choice

Rfce() {
    # Write the Component Name
    echo "import React from 'react';" >>$Path/$1/index.jsx
    echo "import './$1.scss';" >>$Path/$1/index.jsx
    echo "function $1() {" >>$Path/$1/index.jsx
    echo "    return ( " >>$Path/$1/index.jsx
    echo "        <div>" >>$Path/$1/index.jsx
    echo "           $1" >>$Path/$1/index.jsx
    echo "        </div>" >>$Path/$1/index.jsx
    echo "    )" >>$Path/$1/index.jsx
    echo "}" >>$Path/$1/index.jsx
    echo "export default $1" >>$Path/$1/index.jsx
}

Story() {
    # Write Story For Component
    echo "import $1 from './index';" >>$Path/$1/$1.stories.jsx
    echo "export default { " >>$Path/$1/$1.stories.jsx
    echo "title: 'Atoms/$1'," >>$Path/$1/$1.stories.jsx
    echo " component: $1 };" >>$Path/$1/$1.stories.jsx
    echo "export const Template = (args) => <$1 {...args} />;" >>$Path/$1/$1.stories.jsx
}

Test() {
    # Test Boilerplate
    echo "import React from 'react';" >>$Path/$1/$1.test.jsx
    echo "import $1 from './$1';" >>$Path/$1/$1.test.jsx
    echo "import { render, fireEvent, screen } from '@testing-library/react';" >>$Path/$1/$1.test.jsx
    echo "import '@testing-library/jest-dom/extend-expect';" >>$Path/$1/$1.test.jsx
    echo "describe('$1', () => {" >>$Path/$1/$1.test.jsx
    echo "    it('should render without crashing', () => {" >>$Path/$1/$1.test.jsx
    echo "        const div = document.createElement('div');" >>$Path/$1/$1.test.jsx
    echo "        render(<$1 />, div);" >>$Path/$1/$1.test.jsx
    echo "    });" >>$Path/$1/$1.test.jsx
    echo "});" >>$Path/$1/$1.test.jsx
}

# if user input is 1 then create component

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

        # check if directory exists
        DIRECTORY='/home/data'
        if [ ! -d "$Path/$NAME" ]; then
            mkdir -p $Path/$NAME
            touch $Path/$NAME/index.jsx
            touch $Path/$NAME/$NAME.scss
            touch $Path/$NAME/$NAME.test.jsx
            touch $Path/$NAME/$NAME.stories.jsx

            # Write in Component Files
            Rfce $NAME
            Story $NAME
            Test $NAME
            echo "Component Created"
        else
            echo "Component Already Exists"
        fi

    fi

else

    echo "Deleting Component"
    read -p "Enter Component Name: " NAME
    rm -rf $Path/$NAME
fi
