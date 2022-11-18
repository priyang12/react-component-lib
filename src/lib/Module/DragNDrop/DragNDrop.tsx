import { clsx } from 'clsx';
import * as React from 'react';
import './DragNDrop.scss';

export type PropType = {
   children: React.ReactNode;
   onUpload: (files: FileList | any) => void;
   unstyled?: boolean;
   OverLayComponent?: React.ReactNode;
};

const DragNDrop = React.forwardRef<HTMLDivElement, PropType>(
   (
      { children, onUpload, OverLayComponent, unstyled, ...props },
      dropdowncontainerref
   ) => {
      const { className } = props as any;
      const DragClasses = clsx(unstyled ? '' : 'DragNDrop', className);
      const [dragging, setDragging] = React.useState(false);
      const dragCounter = React.useRef(0);
      const dragRef = React.useRef<any>(null);
      const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
         e.preventDefault();
         e.stopPropagation();
      };

      const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
         e.preventDefault();
         e.stopPropagation();
         dragCounter.current++;
         if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true);
         }
      };

      const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
         e.preventDefault();
         e.stopPropagation();
         dragCounter.current--;
         if (dragCounter.current > 0) return;
         setDragging(false);
      };

      const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
         e.preventDefault();
         e.stopPropagation();
         setDragging(false);
         if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onUpload(e.dataTransfer.files);
            e.dataTransfer.clearData();
            dragCounter.current = 0;
         }
      };

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         e.preventDefault();
         e.stopPropagation();

         onUpload(e.target.files);
      };

      const OpenFileModel = () => {
         dragRef?.current?.click();
      };

      return (
         <div {...props} className={DragClasses}>
            <div
               className={`${unstyled ? '' : 'DragNDropContainer'}`}
               onDragEnter={handleDragIn}
               onDragLeave={handleDragOut}
               onDragOver={handleDrag}
               onDrop={handleDrop}
               onClick={OpenFileModel}
               ref={dropdowncontainerref}
            >
               {dragging ? (
                  OverLayComponent ? (
                     OverLayComponent
                  ) : (
                     <div className={`${unstyled ? '' : 'DragNDropOverlay'}`}>
                        <div className="DragNDropOverlayContent">
                           <div className="DragNDropOverlayContentIcon">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 width="24"
                                 height="24"
                              >
                                 <path fill="none" d="M0 0h24v24H0z" />
                                 <path d="M12 2a9 9 0 0 1 9 9v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a9 9 0 0 1 9-9zm0 2a7 7 0 0 0-7 7v6h14v-6a7 7 0 0 0-7-7zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                              </svg>
                           </div>
                           <div className="DragNDropOverlayContentText">
                              Drop files here
                           </div>
                        </div>
                     </div>
                  )
               ) : (
                  React.Children.map(children, child => {
                     if (React.isValidElement(child)) {
                        if (child.props.id === 'File') {
                           return React.cloneElement(child, {
                              // @ts-ignore
                              ref: dragRef,
                              className: `${child.props.className} ${
                                 unstyled ? '' : 'DragNDropInput'
                              }`,
                              onChange: handleFileChange,
                              onClick: (
                                 e: React.MouseEvent<HTMLInputElement>
                              ) => {
                                 e.stopPropagation();
                              },
                           });
                        }
                        return React.cloneElement(child as React.ReactElement, {
                           className: `${child.props.className} ${
                              unstyled ? '' : 'DragNDropContent'
                           }`,
                           onChange: handleFileChange,
                        });
                     }
                     return child;
                  })
               )}
            </div>
         </div>
      );
   }
);

export default DragNDrop;
