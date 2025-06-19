import * as React from 'react';
import './CounterComponent.scss';
import clsx from 'clsx';

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
