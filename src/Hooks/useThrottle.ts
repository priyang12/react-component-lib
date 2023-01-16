import { useRef, useState, useEffect } from 'react';

export function useThrottle<T>(value: T, delay: number): T {
   const [throttledValue, setThrottledValue] = useState(value);
   const lastRan = useRef(Date.now());

   useEffect(() => {
      const handler = setTimeout(function() {
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
