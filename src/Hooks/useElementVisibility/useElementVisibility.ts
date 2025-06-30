import { useEffect, useState } from 'react';

/**
 * A custom hook that tracks whether a DOM element is visible in the viewport using IntersectionObserver.
 *
 * @param ref - A React ref object pointing to the target DOM element.
 * @param options - Optional IntersectionObserver options (e.g., `threshold`, `rootMargin`).
 *
 * @returns `true` if the element is currently intersecting (visible), otherwise `false`.
 *
 * @example
 * ```tsx
 * const ref = useRef(null);
 * const isVisible = useElementVisibility(ref, { threshold: 0.5 });
 *
 * return (
 *   <div ref={ref}>
 *     {isVisible ? 'Element is visible' : 'Element is not visible'}
 *   </div>
 * );
 * ```
 */
export function useElementVisibility(
   ref: React.RefObject<Element>,
   options?: IntersectionObserverInit
): boolean {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(([entry]) => {
         setIsVisible(entry.isIntersecting);
      }, options);

      observer.observe(element);

      return () => {
         observer.disconnect();
      };
   }, [ref, options]);

   return isVisible;
}
