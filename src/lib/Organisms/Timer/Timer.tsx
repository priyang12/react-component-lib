import { useTimer } from '../../../Hooks/useTimer';
import Button from '../../Atoms/Button/Button';
import { ButtonGroup } from '../../Module';
import { clsx } from 'clsx';
import './Timer.scss';

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

   const {
      Hour,
      Minute,
      seconds,
      startTimer,
      stopTimer,
      resetTimer,
   } = useTimer(StartTime);

   return (
      <div className={TimerClass}>
         <h1 className="Heading">Timer</h1>
         <div className={Hidden ? 'TimeDisplay Hidden' : 'TimeDisplay'}>
            <p className="counter">
               Sec <span> {seconds} </span>
            </p>
            <p className="counter">
               Minute <span> {Minute} </span>
            </p>
            <p className="counter">
               Hour <span>{Hour}</span>
            </p>
         </div>

         <ButtonGroup className="primary-border">
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
