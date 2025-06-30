import * as React from 'react';
import DefaultContainer, { DefaultContainerProps } from './DefaultContainer';
import './DragNDrop.scss';

/**
 * Props for the DragNDrop component.
 *
 * Supports drag-and-drop file uploads with optional custom container rendering.
 *
 * @property onDropFile - Callback function triggered when a file is dropped. Receives the dropped File object.
 * @property defaultContainerProps - Props passed to the fallback `DefaultContainer` component when `renderDropContainer` is not used.
 * @property renderDropContainer - Optional render prop for custom drop zone UI. Receives `isDragging` to reflect drag state.
 */
export interface DragNDropProps extends React.ComponentPropsWithoutRef<'div'> {
   /** Callback invoked when a file is dropped into the drop zone. */
   onDropFile?: (file: File) => void;
   /** Optional props for the default fallback container UI. */
   defaultContainerProps?: DefaultContainerProps;
   /** Optional render prop to customize the drop zone UI based on drag state. */
   renderDropContainer?: (args: { isDragging: boolean }) => React.ReactNode;
}

/**
 * Drag-and-drop file upload wrapper component.
 *
 * Handles drag events and provides both default and custom container rendering options.
 * Can be used to capture file input via drag-and-drop, with visual feedback based on dragging state.
 *
 * @returns A `<div>` that listens for drag and drop events and renders either a default or custom container.
 *
 * @example
 * ```tsx
 * <DragNDrop
 *   onDropFile={(file) => console.log(file)}
 *   renderDropContainer={({ isDragging }) => (
 *     <div className={isDragging ? 'highlight' : ''}>Drop a file here</div>
 *   )}
 * />
 * ```
 */
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
         role="button"
         aria-label="File drop area"
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
