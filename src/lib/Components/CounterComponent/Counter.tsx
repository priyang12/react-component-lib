import * as React from 'react';
import './CounterComponent.scss';
import clsx from 'clsx';

/**
 * Props for the Counter component.
 *
 * Extends standard `<div>` props and displays an animated numeric transition.
 *
 * @property initialValue - Optional starting value for the counter (not currently used internally).
 * @property Count - The current counter value.
 * @property PreviousState - The previous value, used to determine animation direction.
 */
export interface CounterProps extends React.ComponentPropsWithoutRef<'div'> {
   /** Optional initial counter value. */
   initialValue?: number;
   /** The current value to display. */
   Count: number;
   /** The previous value used to determine the animation direction. */
   PreviousState: number;
}

/**
 * Counter component for animating numeric value changes.
 *
 * Applies directional slide and fade animations when the value changes.
 * Used internally by `CounterControls` for displaying animated counters.
 *
 * @returns An animated `<div>` element displaying the updated count.
 *
 * @example
 * <Counter ref={ref} Count={current} PreviousState={previous} />
 */

const Counter = React.forwardRef<HTMLDivElement, CounterProps>(
   (props, ref: any) => {
      const { Count, PreviousState } = props;
      const [newCount, setNewCount] = React.useState(Count);

      React.useEffect(() => {
         let hideOldCountTimeout: ReturnType<typeof setTimeout>;
         let setCountTimeout: ReturnType<typeof setTimeout>;
         if (ref?.current) {
            ref.current.style.transform =
               Count > PreviousState ? 'translateY(-100%)' : 'translateY(100%)';
            ref.current.style.opacity = 0;
            hideOldCountTimeout = setTimeout(() => {
               ref.current.style.transform = 'translateY(0)';
               ref.current.style.opacity = 1;
               ref.current.style.transitionDuration = '0s';
               ref.current.style.transform =
                  Count > PreviousState
                     ? 'translateY(100%)'
                     : 'translateY(-100%)';
               ref.current.style.opacity = 0;
               setNewCount(Count);
               setCountTimeout = setTimeout(() => {
                  ref.current.style.transitionDuration = '0.3s';
                  ref.current.style.transform = 'translateY(0)';
                  ref.current.style.opacity = 1;
               }, 20);
            }, 200);
         }
         return () => {
            if (hideOldCountTimeout) clearTimeout(hideOldCountTimeout);
            if (setCountTimeout) clearTimeout(setCountTimeout);
         };
      }, [Count, PreviousState]);

      return (
         <div className={clsx('counter')} ref={ref}>
            {newCount}
         </div>
      );
   }
);

export default Counter;
