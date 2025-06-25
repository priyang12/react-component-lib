import * as React from 'react';
import { usePopContext } from './PopContainer';

export interface popTriggerProps
   extends React.ComponentPropsWithoutRef<'div'> {}

const PopTrigger = ({ children, ...props }: popTriggerProps) => {
   const { setContentState } = usePopContext();
   return (
      <div
         onClick={(e) => {
            props?.onClick ? props?.onClick(e) : null;
            setContentState(true);
         }}
         {...props}
      >
         {children}
      </div>
   );
};

export default PopTrigger;
