import { useRef, useState, useEffect } from 'react';

/**
 * A custom hook that throttles a changing value.
 * Ensures the value only updates at most once every specified delay period.
 *
 * @param value - The value to be throttled.
 * @param delay - The delay in milliseconds for throttling updates.
 *
 * @returns The throttled version of the input value.
 *
 * @example
 * ```tsx
 * const [input, setInput] = useState('');
 * const throttledInput = useThrottle(input, 500);
 *
 * useEffect(() => {
 *   // Only called at most every 500ms
 *   console.log('Throttled input:', throttledInput);
 * }, [throttledInput]);
 * ```
 */
export function useThrottle<T>(value: T, delay: number): T {
   const [throttledValue, setThrottledValue] = useState(value);
   const lastRan = useRef(Date.now());

   useEffect(() => {
      const handler = setTimeout(function () {
         if (Date.now() - lastRan.current >= delay) {
            setThrottledValue(value);
            lastRan.current = Date.now();
         }
      }, delay - (Date.now() - lastRan.current));

      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return throttledValue;
}
