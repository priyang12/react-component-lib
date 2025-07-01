import * as React from 'react';
import { popContextType, usePopContext } from './PopContainer';
import clsx from 'clsx';

export interface PopoverHeaderProps
   extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
   children:
      | React.ReactNode
      | ((
           context: Pick<popContextType, 'setContentState' | 'toggleContent'>
        ) => React.ReactNode);
}

const PopoverHeader = ({
   children,
   className,
   ...props
}: PopoverHeaderProps) => {
   const { setContentState, toggleContent } = usePopContext();

   return (
      <div className={clsx('popover-header', className)} {...props}>
         {typeof children === 'function'
            ? children({ setContentState, toggleContent })
            : children}
      </div>
   );
};

export default PopoverHeader;
