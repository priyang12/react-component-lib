#! /bin/bash

# variables

# Take User Input for Creating Component or deleting Component
echo "Enter 1 to Component"
echo "Enter 2 to Module"
echo "Enter 3 to Organisms"
echo "Enter 4 to Templates"
echo "Enter 5 to Pages"
echo "Enter 6 to Effects"

read choice

Rfce() {
    # Write the Component Name
    echo "import * as React from 'react';" >>$Path/$1/$1.jsx
    echo "import './$1.scss';" >>$Path/$1/$1.jsx
    echo "function $1() {" >>$Path/$1/$1.jsx
    echo "    return ( " >>$Path/$1/$1.jsx
    echo "        <div>" >>$Path/$1/$1.jsx
    echo "           $1" >>$Path/$1/$1.jsx
    echo "        </div>" >>$Path/$1/$1.jsx
    echo "    )" >>$Path/$1/$1.jsx
    echo "}" >>$Path/$1/$1.jsx
    echo "export default $1" >>$Path/$1/$1.jsx
}
index(){
    # Write the Component Name
    echo "import $1 from './$1';" >>$Path/$1/index.jsx
    echo "export default $1;" >>$Path/$1/index.jsx
}
scss() {
    echo "@import '../../styles/variable.scss';" >>$Path/$1/$1.scss
}
Story() {
    # Write Story For Component
    echo "import $1 from './index';" >>$Path/$1/$1.stories.jsx
    echo "export default { " >>$Path/$1/$1.stories.jsx
    echo "title: 'Atoms/$1'," >>$Path/$1/$1.stories.jsx
    echo " component: $1," >>$Path/$1/$1.stories.jsx
    echo "decorators: [(story) => <div className="container">{story()}</div>]," >>$Path/$1/$1.stories.jsx
    echo "};" >>$Path/$1/$1.stories.jsx
    echo "export const Template = (args) => <$1 {...args} />;" >>$Path/$1/$1.stories.jsx
}

Test() {
    # Test Boilerplate
    echo "import React from 'react';" >>$Path/$1/$1.test.jsx
    echo "import $1 from './index.jsx';" >>$Path/$1/$1.test.jsx
    echo "import { render, screen } from '@testing-library/react';" >>$Path/$1/$1.test.jsx
    echo "import '@testing-library/jest-dom/extend-expect';" >>$Path/$1/$1.test.jsx
    echo "    it('should render without crashing', () => {" >>$Path/$1/$1.test.jsx
    echo "        const div = document.createElement('div');" >>$Path/$1/$1.test.jsx
    echo "        render(<$1 />, div);" >>$Path/$1/$1.test.jsx
    echo "    });" >>$Path/$1/$1.test.jsx
}

# if user input is 1 then create component
action() {
    if [ "$1" -eq 1 ]; then
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
                scss $NAME
                index $NAME
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

}

# Switch Case for Creating Component

case $choice in
1)
    Path="src/lib/components"
    # Take User Input for Creating Component or deleting Component
    echo "Enter 1 to create Component"
    echo "Enter 2 to delete Component"
    read InputChoise
    action $InputChoise
    ;;
2)
    Path="src/lib/Module"
    # Take User Input for Creating Component or deleting Component
    echo "Enter 1 to create Module"
    echo "Enter 2 to delete Moduleent"
    read InputChoise
    action $InputChoise
    ;;
3)
    Path="src/lib/Organisms"
    # Take User Input for Creating Component or deleting Component
    echo "Enter 1 to create Organisms"
    echo "Enter 2 to delete Organisms"
    read InputChoise
    action $InputChoise
    ;;
4)
    Path="src/lib/Templates"
    # Take User Input for Creating Component or deleting Component
    echo "Enter 1 to create Templates"
    echo "Enter 2 to delete Templates"
    read InputChoise
    action $InputChoise
    ;;
5)
    Path="src/lib/Pages"
    # Take User Input for Creating Component or deleting Component
    echo "Enter 1 to create Pages"
    echo "Enter 2 to delete Pagesnent"
    read InputChoise
    action $InputChoise
    ;;
6)
    Path="src/lib/Effects"
    # Take User Input for Creating Component or deleting Component
    echo "Enter 1 to create Effects"
    echo "Enter 2 to delete Effects"
    read InputChoise
    action $InputChoise
    ;;
*)
    echo "Invalid Input"
    ;;
esac
