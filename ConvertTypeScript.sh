Path="src/lib"

# get names of files in path

for entry in "$Path"/*; do
    # echo "$entry"

    # Loop through all folders in path
    
    if [ -d "$entry" ]; then
        # echo "Directory"

        for folder in "$entry"/*; do
            # echo "$folder"
            
            # Loop through all files in folder

            for file in "$folder"/*; do
                echo "$file"
                
                # Convert file to tsx extension
                
                if [[ $file == *.jsx ]]; then
                echo "jsx file"
                echo "converting $file"
                echo "to $file.tsx"
                # remove .jsx extension
                filename=$(basename "$file" .jsx)
                # add .tsx extension
                newfilename=$filename.tsx
                # rename file
                mv "$file" "$folder/$newfilename"
            
                fi
            done
        done
        
    fi

done