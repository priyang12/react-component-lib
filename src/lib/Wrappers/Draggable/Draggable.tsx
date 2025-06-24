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
   const [PreviousTouch, setPreviousTouch] = React.useState({ x: 0, y: 0 });

   const DragRef = React.useRef<null | HTMLDivElement>(null);

   const handleMouseDown = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         e.preventDefault();
         setIsDragging(true);
         if (DragRef.current) {
            DragRef.current.style.cursor = 'grabbing';
         }
      },
      [setIsDragging, DragRef]
   );

   const handleMouseUp = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         e.preventDefault();
         setIsDragging(false);
         if (DragRef.current) {
            DragRef.current.style.cursor = 'grab';
         }
      },
      [setIsDragging, DragRef]
   );

   const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         if (isDragging) {
            setPosition({
               x: position.x + e.movementX,
               y: position.y + e.movementY,
            });
         }
      },
      [isDragging, position]
   );

   const handleMouseMoveWithParent = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         if (isDragging) {
            if (parentContainerRef?.current && DragRef.current) {
               // if parent ref is passed than it should not drag out side the parent container
               const parentRect =
                  parentContainerRef.current.getBoundingClientRect();
               const drag = DragRef.current?.getBoundingClientRect();

               if (drag.top < parentRect.top) {
                  setPosition({
                     ...position,
                     y: 0,
                  });
               } else if (drag.x < parentRect.x) {
                  setPosition({
                     ...position,
                     x: 0,
                  });
               } else if (
                  drag.bottom - parentRect.bottom > parentRect.bottom / 2 &&
                  e.movementY > 0
               ) {
                  setPosition({
                     ...position,
                     y: position.y,
                  });
               } else {
                  setPosition({
                     x: position.x + e.movementX,
                     y: position.y + e.movementY,
                  });
               }
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

   const handleTouchStart = React.useCallback(
      (_: React.TouchEvent<HTMLDivElement>) => {
         setIsDragging(true);
         if (DragRef.current) {
            DragRef.current.style.cursor = 'grabbing';
         }
      },
      [setIsDragging, DragRef]
   );

   const handleTouchMove = React.useCallback(
      (e: React.TouchEvent<HTMLDivElement>) => {
         if (isDragging) {
            setPreviousTouch({
               x: e.touches[0].pageX,
               y: e.touches[0].pageY,
            });
            if (PreviousTouch.x !== 0 && PreviousTouch.y !== 0) {
               setPosition({
                  x: position.x + e.touches[0].pageX - PreviousTouch.x,
                  y: position.y + e.touches[0].pageY - PreviousTouch.y,
               });
            }
         }
      },
      [isDragging, position]
   );

   return (
      <div>
         <div
            ref={DragRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={
               parentContainerRef ? handleMouseMoveWithParent : handleMouseMove
            }
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
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
