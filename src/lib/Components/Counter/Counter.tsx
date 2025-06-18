import * as React from 'react';
import './Counter.scss';

/**
 *
 *
 * @export
 * @interface CounterProps
 * @extends {React.ComponentPropsWithoutRef<'div'>}
 */
export interface CounterProps extends React.ComponentPropsWithoutRef<'div'> {
   initialValue?: number;
   Count: number;
   PreviousState: number;
}
/**
 * Counter component that animates a value change
 *
 * @export
 * @param {CounterProps} props
 * @returns {JSX.Element}
 */

const Counter = React.forwardRef<HTMLDivElement, CounterProps>(
   (props, ref: any) => {
      const { Count, PreviousState } = props;
      const [NewCount, setNewCount] = React.useState(Count);
      React.useEffect(() => {
         if (ref?.current) {
            ref.current.style.transform =
               Count > PreviousState ? 'translateY(-100%)' : 'translateY(100%)';
            ref.current.style.opacity = 0;
            setTimeout(() => {
               ref.current.style.transform = 'translateY(0)';
               ref.current.style.opacity = 1;
               ref.current.style.transitionDuration = '0s';
               ref.current.style.transform =
                  Count > PreviousState
                     ? 'translateY(100%)'
                     : 'translateY(-100%)';
               ref.current.style.opacity = 0;
               setNewCount(Count);
               setTimeout(() => {
                  ref.current.style.transitionDuration = '0.3s';
                  ref.current.style.transform = 'translateY(0)';
                  ref.current.style.opacity = 1;
               }, 20);
            }, 200);
         }
      }, [Count, PreviousState, ref]);
      return (
         <div className="counter" ref={ref}>
            {NewCount}
         </div>
      );
   }
);

export default Counter;
