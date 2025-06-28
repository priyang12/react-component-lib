import * as React from 'react';
import './Draggable.scss';
import { useDraggable } from './Hooks/useDraggble';
import { Slot } from '../Util/AsChildSlot';

/**
 * Props for the `Draggable` component.
 *
 * Enables drag functionality for a child component or a wrapper `div`. Integrates with an optional container boundary.
 *
 * @property parentContainerRef - Optional reference to a parent container to constrain dragging within bounds.
 * @property asChild - If `true`, uses the child as the rendered element via `Slot` pattern (i.e., `asChild` behavior).
 * @property children - The element(s) to be made draggable.
 */
export type DraggableProps = {
   /** reference to a parent container to constrain dragging within bounds */
   parentContainerRef?: React.RefObject<HTMLAnchorElement>;
   /** boolean uses the child as the rendered element via `Slot` pattern */
   asChild?: boolean;
   /** Content rendered inside the Draggable. */
   children: React.ReactNode;
};

/**
 * `Draggable` is a component that allows any child element to be moved around via drag gestures.
 *
 * It supports boundary constraints via a parent ref and the `asChild` pattern for wrapping native or custom components directly.
 *
 * @returns A draggable element or child that responds to pointer events and updates its position dynamically.
 *
 * @example
 * ```tsx
 * <Draggable>
 *   <div className="box">Drag me</div>
 * </Draggable>
 * ```
 * ```tsx
 * <Draggable asChild>
 *   <CustomComponent />
 * </Draggable>
 * ```
 */
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
