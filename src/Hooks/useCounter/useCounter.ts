import * as React from 'react';

/**
 * A custom hook to manage a numeric counter with optional min/max boundaries,
 * previous state tracking, and looping behavior.
 *
 * @param initialValue - The initial value of the counter (defaults to 0)
 * @param MINMAX - The minimum and maximum value of the counter when it reaches the maximum or minimum
 *  If Min is greater than initialValue, the counter will start at the minimum.
 *
 * @returns Returns an object with the following properties:
 * - value - The current value of the counter
 * - PreviousState - The previous value of the counter
 * - increment - A function that increments the counter by 1
 * - decrement - A function that decrements the counter by 1
 * - reset - A function that resets the counter to the initial value
 * - setValue - A function that sets the counter to a specific value
 * - setMinMax - A function that sets the minimum and maximum value of the counter
 * - resetCounter - A function that resets the counter to the initial value and sets.
 * - restToZero - A function that resets the counter to 0
 *
 *  * @example
 * ```tsx
 * const {
 *   Count,
 *   Increment,
 *   Decrement,
 *   resetCounter
 * } = useCounter(5, { min: 0, max: 10 });
 *
 * return (
 *   <>
 *     <button onClick={Decrement}>-</button>
 *     <span>{Count}</span>
 *     <button onClick={Increment}>+</button>
 *     <button onClick={resetCounter}>Reset</button>
 *   </>
 * );
 * ```
 *
 */
export const useCounter = (
   initialCount: number = 0,
   MINMAX: {
      max: number | null;
      min: number | null;
   }
) => {
   const [Count, setCount] = React.useState(() => {
      if (MINMAX.min && MINMAX.min > initialCount) {
         return MINMAX.min;
      }
      return initialCount;
   });

   const [PreviousState, setPreviousState] = React.useState(
      MINMAX.min || initialCount
   );

   const [Max, setMax] = React.useState(MINMAX.max);
   const [Min, setMin] = React.useState(MINMAX.min);

   const Increment = React.useCallback(() => {
      if (
         (typeof Max === 'number' && Count >= Max) ||
         (PreviousState === Count && Count < initialCount)
      ) {
         return;
      }

      setPreviousState(Count);
      setCount((prevCount) => prevCount + 1);
   }, [Count, Max]);

   const RoundIncrement = React.useCallback(() => {
      if (Count === Max) {
         setCount(MINMAX.min || 1);
      } else {
         setPreviousState(Count);
         setCount((prevCount) => prevCount + 1);
      }
   }, [Count, Max]);

   const Decrement = React.useCallback(() => {
      if (
         (Min !== null && Count <= Min) ||
         (PreviousState === Count && Count > initialCount)
      ) {
         return;
      }
      setPreviousState(Count);
      setCount((prevCount) => prevCount - 1);
   }, [Count, Min]);

   const RoundDecrement = React.useCallback(() => {
      if (Count === Min) {
         setCount(MINMAX.max || 31);
      } else {
         setPreviousState(Count);
         setCount((prevCount) => prevCount - 1);
      }
   }, [Count, Min]);

   const resetCounter = () => {
      setCount(initialCount);
      setMax(MINMAX.max);
      setMin(MINMAX.min);
   };

   const setCounter = React.useCallback(
      (value: number) => {
         setCount(value);
      },
      [Count]
   );

   const setMaxCounter = (value: number) => {
      setMax(value);
   };

   const setMinCounter = (value: number) => {
      setMin(value);
   };

   const restToZero = () => {
      setCount(0);
      setMax(0);
      setMin(0);
   };

   return {
      Count,
      PreviousState,
      NextState: Count + 1,
      Increment,
      RoundIncrement,
      RoundDecrement,
      Decrement,
      resetCounter,
      setCounter,
      setMaxCounter,
      setMinCounter,
      restToZero,
   };
};
