import { useEffect, useState } from 'react';

export function useTimer(initTime = 0) {
   const [seconds, setSeconds] = useState(initTime % 60);
   const [minutes, setMinutes] = useState(Math.floor(initTime / 60));
   const [hours, setHours] = useState(Math.floor(initTime / 3600));
   const [isRunning, setIsRunning] = useState(false);
   const [intervalId, setIntervalId] = useState<any>(null);

   useEffect(() => {
      function handleVisibilityChange() {
         if (document.hidden) {
            stopTimer();
         } else {
            startTimer();
         }
      }
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
         document.removeEventListener(
            'visibilitychange',
            handleVisibilityChange
         );
      };
   }, [isRunning]);

   useEffect(() => {
      if (isRunning) {
         const id = setInterval(() => {
            setSeconds(seconds => {
               if (seconds >= 59) {
                  setMinutes(minutes => {
                     if (minutes >= 59) {
                        setHours(hours => hours + 1);
                        return 0;
                     }
                     return minutes + 1;
                  });
                  return 0;
               }
               return seconds + 1;
            });
         }, 1000);
         setIntervalId(id);
      } else {
         clearInterval(intervalId);
         setIntervalId(null);
      }
   }, [isRunning]);

   function startTimer() {
      setIsRunning(true);
   }

   function stopTimer() {
      setIsRunning(false);
   }

   function resetTimer() {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
   }

   return { seconds, minutes, hours, startTimer, stopTimer, resetTimer };
}
