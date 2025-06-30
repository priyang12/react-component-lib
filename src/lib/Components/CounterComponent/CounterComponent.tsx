import * as React from 'react';
import { useCounter } from '../../../Hooks/useCounter';
import Counter from './Counter';
import './CounterComponent.scss';

/**
 * Props for the CounterControls component.
 *
 * Provides control over a counter value and renders custom UI using a render prop.
 *
 * @property initialValue - Optional starting value for the counter. Defaults to `0`.
 * @property renderCounter - A render prop function that receives the current and previous count values, along with a ref, and returns a React element to display.
 */
export interface CounterControlsProps {
   /** Initial count value for the counter. */
   initialValue?: number;
   /** Render prop that provides custom rendering logic for the counter display. */
   renderCounter: (
      ref: any,
      Count: number,
      PreviousState: number
   ) => React.ReactNode;
}

/**
 * A component that renders increment and decrement buttons and displays counter state using a render prop.
 *
 * Useful for building flexible counter UIs with customized display components.
 * Internally manages state using the `useCounter` hook.
 *
 * @returns A counter wrapper element with control buttons and a dynamic display region.
 *
 * @example
 * ```tsx
 * <CounterControls
 *   initialValue={5}
 *   renderCounter={(count) => <span>{count}</span>}
 * />
 * ```
 */
export const CounterControls: React.FC<CounterControlsProps> = ({
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
               aria-label="Increment counter"
               className="counter-button"
               onClick={() => onTrigger('increment')}
            >
               +
            </button>
            <div className="sr-only" id="counter-label">
               Current Count : {Count}
            </div>
            <div
               aria-labelledby="counter-label"
               role="region"
               aria-live="polite"
            >
               {renderCounter(ref, Count, PreviousState)}
            </div>
            <button
               aria-label="Decrement counter"
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
