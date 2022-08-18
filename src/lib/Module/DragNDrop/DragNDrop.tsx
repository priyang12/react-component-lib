import * as React from 'react';
import './DragNDrop.scss';

function DragNDrop({ children }: { children: React.ReactNode }) {
   return (
      <div className="DragNDrop">
         <div className="DragNDropContainer">{children}</div>
      </div>
   );
}
export default DragNDrop;

// {React.cloneElement(children, {
//     onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
//        e.preventDefault();
//        e.stopPropagation();
//     },
//     onDrop: (e: React.DragEvent<HTMLDivElement>) => {
//        e.preventDefault();
//        e.stopPropagation();
//        const files = e.dataTransfer.files;
//        if (files.length > 0) {
//           const file = files[0];
//           const reader = new FileReader();
//           reader.onload = (e: ProgressEvent) => {
//              const data = (e.target as FileReader).result;
//              if (data) {
//                 console.log(data);
//              }
//           };
//           reader.readAsText(file);
//        }
//     },
//  })}
