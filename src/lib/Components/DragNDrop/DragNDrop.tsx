import * as React from 'react';
import DefaultContainer, { DefaultContainerProps } from './DefaultContainer';
import './DragNDrop.scss';

interface DragNDropProps extends React.ComponentPropsWithoutRef<'div'> {
   onDropFile?: (file: File) => void;
   defaultContainerProps?: DefaultContainerProps;
   renderDropContainer?: (args: { isDragging: boolean }) => React.ReactNode;
}

function DragNDrop({
   renderDropContainer,
   defaultContainerProps,
   onDropFile,
   children,
   ...props
}: DragNDropProps) {
   const [isDragging, setIsDragging] = React.useState(false);

   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
   };

   const handleDragLeave = () => {
      setIsDragging(false);
   };

   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];

      if (file && onDropFile) {
         onDropFile(file);
      }
   };

   return (
      <div
         className={`drag-n-drop ${isDragging ? 'dragging' : ''}`}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
         {...props}
      >
         {renderDropContainer ? (
            renderDropContainer({ isDragging })
         ) : (
            <DefaultContainer
               onFileSelect={onDropFile}
               {...defaultContainerProps}
            />
         )}
         {children}
      </div>
   );
}

export default DragNDrop;
