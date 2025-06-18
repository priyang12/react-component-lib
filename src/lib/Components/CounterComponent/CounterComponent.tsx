import * as React from 'react';
import { useCounter } from '../../../Hooks/useCounter';
import { Counter } from '../Counter';
import './CounterComponent.scss';

function CounterComponent({ initialValue = 0 }) {
   const ref = React.useRef(null);
   const { Count, PreviousState, Increment, Decrement } = useCounter(
      initialValue,
      {
         min: 0,
         max: null,
      }
   );
   const onTrigger = (trigger: 'increment' | 'decrement') => {
      if (trigger === 'increment') {
         // onIncrement && onIncrement();

         Increment();
      }
      if (trigger === 'decrement') {
         // onDecrement && onDecrement();
         Decrement();
      }
   };
   return (
      <>
         <button onClick={() => onTrigger('increment')}>+</button>
         <Counter ref={ref} Count={Count} PreviousState={PreviousState} />
         <button onClick={() => onTrigger('decrement')}>-</button>
      </>
   );
}
export default CounterComponent;
