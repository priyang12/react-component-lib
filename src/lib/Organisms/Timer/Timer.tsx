import { useTimer } from '../../../Hooks/useTimer';
import Button from '../../Components/Button/Button';
import { ButtonGroup } from '../../Module';
import { clsx } from 'clsx';
import './Timer.scss';
// import { useBackgroundTime } from '../../../Hooks/useBackgroundTime';

function Timer({
   StartTime,
   Hidden,
   ...props
}: {
   StartTime: number;
   Hidden: boolean;
}) {
   const { className } = props as any;
   const TimerClass = clsx('Timer', Hidden && 'hide', className);

   const { hours, minutes, seconds, resetTimer, startTimer, stopTimer } =
      useTimer(3595);

   return (
      <div className={TimerClass}>
         <div className={Hidden ? 'TimeDisplay Hidden' : 'TimeDisplay'}>
            <p className="">
               Sec <span> : {seconds} </span>
            </p>
            <p className="">
               Minute <span> : {minutes} </span>
            </p>
            <p className="">
               Hour <span> : {hours}</span>
            </p>
         </div>

         <ButtonGroup className="primary-border justify-between">
            <Button onClick={startTimer}>Start</Button>
            <Button variant="secondary-border" onClick={stopTimer}>
               Stop
            </Button>
            <Button onClick={resetTimer}>Reset</Button>
         </ButtonGroup>
      </div>
   );
}
export default Timer;
