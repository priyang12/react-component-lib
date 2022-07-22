import { useTimer } from '../../../Hooks/useTimer';
import './Timer.scss';

function Timer({ StartTime }: { StartTime: number }) {
   const {
      Day,
      Hour,
      Minute,
      seconds,
      TotalTime,
      startTimer,
      stopTimer,
      resetTimer,
      CountTotalTime,
   } = useTimer(StartTime);

   const GetTotalTime = () => {
      console.log(CountTotalTime());
   };

   return (
      <div>
         <button onClick={startTimer}>Start</button>
         <button onClick={stopTimer}>Stop</button>
         <button onClick={resetTimer}>Reset</button>
         <h1>Timer</h1>
         <p>Sec : {seconds}</p>
         <p>Minute: {Minute}</p>
         <p>Hour: {Hour}</p>
         <p>Day: {Day}</p>
         <button onClick={GetTotalTime}>Total Time : {TotalTime}</button>
      </div>
   );
}
export default Timer;
