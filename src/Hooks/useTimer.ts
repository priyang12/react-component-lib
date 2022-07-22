import * as React from 'react';

export const useTimer = (initialTime: number) => {
   const [Start, setStart] = React.useState(false);
   const [seconds, setSeconds] = React.useState(initialTime);
   const [Minute, setMinute] = React.useState(0);
   const [Hour, setHour] = React.useState(0);
   const [Day, setDay] = React.useState(0);
   const [TotalTime, setTotalTime] = React.useState(0);

   React.useLayoutEffect(() => {
      let interval: any;
      if (Start) {
         interval = setInterval(() => {
            setSeconds(seconds + 1);
         }, 1000);
      } else {
         clearInterval(interval);
      }
      return () => clearInterval(interval);
   }, [seconds, Start]);

   React.useLayoutEffect(() => {
      if (seconds > 59) {
         setMinute(Minute + 1);
         setSeconds(0);
      }
   }, [Minute, seconds]);

   React.useLayoutEffect(() => {
      if (Minute > 59) {
         setHour(Hour + 1);
         setMinute(0);
      }
   }, [Hour, Minute]);

   React.useLayoutEffect(() => {
      if (Hour > 23) {
         setDay(Day + 1);
         setHour(0);
      }
   }, [Day, Hour]);

   const resetTimer = () => {
      setStart(false);
      setSeconds(initialTime);
      setMinute(0);
      setHour(0);
      setDay(0);
      setTotalTime(0);
   };
   const startTimer = () => {
      setStart(true);
   };
   const stopTimer = () => {
      setStart(false);
   };
   const CountTotalTime = React.useCallback(() => {
      setTotalTime(seconds + Minute * 60 + Hour * 3600 + Day * 86400);
      return seconds + Minute * 60 + Hour * 3600 + Day * 86400;
   }, [seconds, Minute, Hour, Day]);

   return {
      seconds,
      Minute,
      Hour,
      Day,
      Start,
      TotalTime,
      CountTotalTime,
      setStart,
      startTimer,
      stopTimer,
      resetTimer,
   };
};
