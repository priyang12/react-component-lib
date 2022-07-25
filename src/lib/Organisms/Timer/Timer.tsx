import { useTimer } from '../../../Hooks/useTimer';
import Button from '../../components/Button';
import { ButtonGroup } from '../../Module';
import './Timer.scss';

function Timer({ StartTime, Hidden }: { StartTime: number; Hidden: boolean }) {
   const {
      Hour,
      Minute,
      seconds,
      startTimer,
      stopTimer,
      resetTimer,
   } = useTimer(StartTime);

   return (
      <div className="Timer">
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

         <ButtonGroup className="primary-border" zIndex={2}>
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
