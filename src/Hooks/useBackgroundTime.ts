import { useState, useEffect } from 'react';

export function useBackgroundTime() {
   const [time] = useState(new Date());
   const [seconds, setSeconds] = useState(0);
   useEffect(() => {
      let id: any;
      function updateTime() {
         // setTime((CurrantTime) => CurrantTime  - time);
         const elapsed = (new Date() as any) - ((time as unknown) as number);
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
