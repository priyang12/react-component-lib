import { useRef } from 'react';

/**
 * A custom hook to create a ripple effect on a button element.
 *
 * @param rippleProp - Optional configuration object:
 * - `show`: Whether to enable the ripple effect.
 * - `bgColor`: Optional custom background color for the ripple.
 *
 * @param duration - Duration (in milliseconds) before the ripple is removed. Default is 500ms.
 *
 * @returns An object containing:
 * - `ref`: A `ref` to be attached to the target button element.
 * - `createRipple`: A function to trigger the ripple effect, typically bound to an `onClick` event.
 *
 * @example
 * ```tsx
 * const { ref, createRipple } = useRipple({ show: true, bgColor: '#ccc' });
 *
 * return (
 *   <button ref={ref} onClick={createRipple}>
 *     Click Me
 *   </button>
 * );
 * ```
 */
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
