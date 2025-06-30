import { useState, useEffect } from 'react';

/**
 * Custom hook to track the number of seconds elapsed since the component mounted.
 * Automatically pauses when the page is hidden and resumes when visible again.
 *
 * @returns An object containing:
 * - `startTime`: The time when the hook was initialized.
 * - `seconds`: Number of seconds elapsed since `startTime`.
 */
export function useBackgroundTime() {
   const [time] = useState(new Date());
   const [seconds, setSeconds] = useState(0);
   useEffect(() => {
      let id: any;
      function updateTime() {
         const elapsed = new Date().getTime() - time.getTime();
         if (elapsed > 1000) {
            const TotalSeconds = Math.floor(elapsed / 1000);
            setSeconds(TotalSeconds);
         }
      }
      // Start the timer when the component mounts
      id = setInterval(updateTime, 1000);
      // When the page is hidden, stop the timer
      document.addEventListener('visibilitychange', () => {
         if (document.visibilityState === 'hidden') {
            clearInterval(id);
         } else {
            id = setInterval(updateTime, 1000);
         }
      });
      // Clean up the timer when the component unmounts
      return () => clearInterval(id);
   }, []);

   return { time, seconds };
}
