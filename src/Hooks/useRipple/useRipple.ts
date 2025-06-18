import { useRef } from 'react';

export function useRipple(
   rippleProp?: {
      show: boolean;
      bgColor?: string;
   },
   duration = 500
) {
   const ref = useRef<HTMLButtonElement>(null);

   const createRipple = (event: React.MouseEvent) => {
      if (rippleProp && rippleProp.show) {
         const el = ref.current;
         if (!el) return;

         const ripple = document.createElement('span');
         ripple.className = 'ripple';

         if (rippleProp.bgColor)
            ripple.style.setProperty('--ripple-color', rippleProp.bgColor);

         const rect = el.getBoundingClientRect();
         const x = event.clientX - rect.left;
         const y = event.clientY - rect.top;

         ripple.style.setProperty('--ripple-x', `${x}px`);
         ripple.style.setProperty('--ripple-y', `${y}px`);

         el.appendChild(ripple);

         setTimeout(() => {
            ripple.remove();
         }, duration);
      }
   };

   return { ref, createRipple };
}
