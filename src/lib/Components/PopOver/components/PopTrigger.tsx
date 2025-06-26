import * as React from 'react';
import { usePopContext } from './PopContainer';

export interface popTriggerProps
   extends React.ComponentPropsWithoutRef<'div'> {}

const PopTrigger = ({ children, ...props }: popTriggerProps) => {
   const { toggleContent } = usePopContext();
   return (
      <div
         onClick={(e) => {
            props?.onClick ? props?.onClick(e) : null;
            toggleContent();
         }}
         {...props}
      >
         {children}
      </div>
   );
};

export default PopTrigger;
