import * as React from 'react';
import './Draggable.scss';
import { useDraggable } from './Hooks/useDraggble';
import { Slot } from '../Util/AsChildSlot';

export type DraggableProps = {
   parentContainerRef?: React.RefObject<HTMLAnchorElement>;
   asChild?: boolean;
   children: React.ReactNode;
};

function Draggable({
   parentContainerRef,
   asChild = false,
   children,
}: DraggableProps) {
   const { position, ref: DragRef } = useDraggable(parentContainerRef);
   const RenderEle = asChild ? Slot : 'div';

   return (
      <RenderEle
         ref={DragRef}
         style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            cursor: 'grab',
         }}
      >
         {children}
      </RenderEle>
   );
}
export default Draggable;
