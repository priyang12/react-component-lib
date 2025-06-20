import React from 'react';

export interface DefaultContainerProps {
   id?: string;
   text?: string;
   inputHidden?: boolean;
   onFileSelect?: (file: File) => void;
   onClickLabel?: () => void;
}

function DefaultContainer({
   id = 'dnd-input',
   text = 'Drag & Drop a file here or click to upload',
   inputHidden = true,
   onFileSelect,
   onClickLabel,
}: DefaultContainerProps) {
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && onFileSelect) {
         onFileSelect(file);
      }
   };

   return (
      <div className="dnd-default-container">
         <label
            htmlFor={id}
            onClick={onClickLabel}
            style={{ cursor: 'pointer' }}
         >
            <p>{text}</p>
         </label>

         <input
            id={id}
            type="file"
            hidden={inputHidden}
            onChange={handleInputChange}
            aria-label={text}
         />
      </div>
   );
}

export default DefaultContainer;
