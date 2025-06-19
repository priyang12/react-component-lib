import * as React from 'react';
import { useCounter } from '../../../Hooks/useCounter';
import Counter from './Counter';
import './CounterComponent.scss';

export interface CounterControlsProps {
   initialValue?: number;
   renderCounter: (
      ref: any,
      Count: number,
      PreviousState: number
   ) => React.ReactNode;
}

const CounterControls: React.FC<CounterControlsProps> = ({
   initialValue = 0,
   renderCounter,
}) => {
   const ref = React.useRef(null);
   const { Count, PreviousState, Increment, Decrement } = useCounter(
      initialValue,
      {
         min: 0,
         max: null,
      }
   );
   const onTrigger = (trigger: 'increment' | 'decrement') => {
      if (trigger === 'increment') Increment();
      if (trigger === 'decrement') Decrement();
   };
   return (
      <div className="counter-wrapper">
         <div className="counter-buttons">
            <button
               className="counter-button"
               onClick={() => onTrigger('increment')}
            >
               +
            </button>
            {renderCounter(ref, Count, PreviousState)}
            <button
               className="counter-button"
               onClick={() => onTrigger('decrement')}
            >
               -
            </button>
         </div>
      </div>
   );
};

const CounterComponents = {
   CounterControls,
   Counter,
};

export default CounterComponents;
