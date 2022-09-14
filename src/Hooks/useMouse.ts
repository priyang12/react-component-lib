import * as React from 'react';

export const useMouse = (ref: React.RefObject<Element>) => {
   const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

   const handleMouseMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY });
   };

   React.useLayoutEffect(() => {
      const element = ref.current;
      if (element) {
         element.addEventListener(
            'mousemove',
            handleMouseMove as EventListener
         );
      } else {
         document.addEventListener('mousemove', handleMouseMove);
      }
      return () => {
         if (element) {
            element.removeEventListener(
               'mousemove',
               handleMouseMove as EventListener
            );
         } else {
            document.removeEventListener('mousemove', handleMouseMove);
         }
      };
   }, [ref]);

   return mouse;
};
