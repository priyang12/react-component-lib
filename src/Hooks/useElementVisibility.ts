import { useState, useEffect } from 'react';

export function useElementVisibility(ref: React.RefObject<any>): boolean {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      // Check if the element is in the viewport
      function checkVisibility() {
         if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setIsVisible(
               rect.top >= 0 &&
                  rect.left >= 0 &&
                  rect.bottom <=
                     (window.innerHeight ||
                        document.documentElement.clientHeight) &&
                  rect.right <=
                     (window.innerWidth || document.documentElement.clientWidth)
            );
         }
      }

      // Check the visibility on mount and on every scroll and resize event
      checkVisibility();
      window.addEventListener('scroll', checkVisibility);
      window.addEventListener('resize', checkVisibility);

      // Clean up the event listeners when the component unmounts
      return () => {
         window.removeEventListener('scroll', checkVisibility);
         window.removeEventListener('resize', checkVisibility);
      };
   }, [ref]);

   return isVisible;
}
