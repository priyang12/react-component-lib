import * as React from 'react';
import './Draggable.scss';

export type DraggableProps = {
   isDragging: boolean;
   setIsDragging: (isDragging: boolean) => void;
   parentContainerRef?: React.RefObject<HTMLAnchorElement>;
   children: React.ReactNode;
};

function Draggable({
   isDragging,
   setIsDragging,
   parentContainerRef,
   children,
}: DraggableProps) {
   const [position, setPosition] = React.useState({ x: 0, y: 0 });

   const ref = React.useRef<null | HTMLDivElement>(null);
   const handleMouseDown = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         e.preventDefault();
         setIsDragging(true);
         if (ref.current) {
            ref.current.style.cursor = 'grabbing';
         }
      },
      [setIsDragging, ref]
   );

   const handleMouseUp = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         e.preventDefault();
         setIsDragging(false);
         if (ref.current) {
            ref.current.style.cursor = 'grab';
         }
      },
      [setIsDragging, ref]
   );

   const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         if (isDragging) {
            if (parentContainerRef?.current) {
               // if parent ref is passed than it should not drag out side the parent container
               const parentContainer = parentContainerRef.current;
               const parentContainerRect = parentContainer.getBoundingClientRect();

               // still need to implement it.
            } else {
               setPosition({
                  x: position.x + e.movementX,
                  y: position.y + e.movementY,
               });
            }
         }
      },
      [isDragging, parentContainerRef, position]
   );

   return (
      <div>
         <div
            ref={ref}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            style={{
               transform: `translate(${position.x}px, ${position.y}px)`,
               cursor: 'grab',
            }}
         >
            {children}
         </div>
      </div>
   );
}
export default Draggable;
