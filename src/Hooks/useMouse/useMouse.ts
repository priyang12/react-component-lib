import * as React from 'react';
/**
 * useMouse is a custom hook that tracks the mouse position.
 *
 * @param ref - A ref object that refers to an element. If provided, the hook
 * will track the mouse position within that element. If not provided, the hook
 * will track the mouse position within the whole document.
 *
 * @returns an object with the properties `x` and `y`, which represent the
 * current mouse position.
 *
 * @example
 *
 * const MouseTracker = () => {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const mouse = useMouse(ref);
 *
 *   return (
 *     <div ref={ref}>
 *       The mouse position is ({mouse.x}, {mouse.y})
 *     </div>
 *   );
 * }
 */

export const useMouse = (ref: React.RefObject<Element>) => {
   const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

   const handleMouseMove = React.useCallback((event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY });
   }, []) as EventListener;

   React.useEffect(() => {
      const element = ref.current;
      const target = element ?? document;

      target.addEventListener('mousemove', handleMouseMove);

      return () => {
         target.removeEventListener('mousemove', handleMouseMove);
      };
   }, [ref.current, handleMouseMove]);

   return mouse;
};
