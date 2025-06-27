import * as React from 'react';

// Edge Handling:
// Optionally prevent dragging outside a container.
// Handle window resizing or scrolling.

export function useDraggable(
   containerRef?: React.RefObject<HTMLAnchorElement>
) {
   const [position, setPosition] = React.useState({ x: 0, y: 0 });

   const isDragging = React.useRef(false);
   const startPointer = React.useRef({ x: 0, y: 0 });
   const startPosition = React.useRef({ x: 0, y: 0 });

   const ref = React.useRef<HTMLDivElement | null>(null);

   const onMouseDown = React.useCallback(
      (e: MouseEvent | TouchEvent) => {
         e.preventDefault();

         const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
         const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

         isDragging.current = true;
         startPointer.current = { x: clientX, y: clientY };
         startPosition.current = { ...position };
         addEventListener();
      },
      [position]
   );

   const onMouseMove = React.useCallback((e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startPointer.current.x;
      const dy = clientY - startPointer.current.y;

      let newX = startPosition.current.x + dx;
      let newY = startPosition.current.y + dy;

      if (containerRef?.current && ref.current) {
         // need to build the logic
         // @ts-ignore
         const containerRect = containerRef.current.getBoundingClientRect();
         // @ts-ignore
         const elementRect = ref.current.getBoundingClientRect();
      }
      setPosition({
         x: newX,
         y: newY,
      });
   }, []);

   const onMouseUp = React.useCallback(() => {
      isDragging.current = false;
      removeEventListener();
   }, [onMouseMove]);

   const addEventListener = React.useCallback(() => {
      document.addEventListener('mousemove', onMouseMove as any);
      document.addEventListener('touchmove', onMouseMove as any, {
         passive: false,
      });
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchend', onMouseUp);
   }, []);

   const removeEventListener = React.useCallback(() => {
      document.removeEventListener('mousemove', onMouseMove as any);
      document.removeEventListener('touchmove', onMouseMove as any);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
   }, [onMouseMove, onMouseUp]);

   React.useEffect(() => {
      const element = ref.current;
      if (!element) return;

      element.addEventListener('mousedown', onMouseDown as any);
      element.addEventListener('touchstart', onMouseDown as any, {
         passive: false,
      });

      return () => {
         element.removeEventListener('mousedown', onMouseDown as any);
         element.removeEventListener('touchstart', onMouseDown as any);
      };
   }, [onMouseDown]);

   return { ref, position };
}
