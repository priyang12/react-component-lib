import * as React from 'react';
import { popContextType, usePopContext } from './PopContainer';
import clsx from 'clsx';

export interface PopoverFooterProps
   extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
   children:
      | React.ReactNode
      | ((
           context: Pick<popContextType, 'setContentState' | 'toggleContent'>
        ) => React.ReactNode);
}

const PopoverFooter = ({
   children,
   className,
   ...props
}: PopoverFooterProps) => {
   const { setContentState, toggleContent } = usePopContext();

   return (
      <div className={clsx('popover-footer', className)} {...props}>
         {typeof children === 'function'
            ? children({ setContentState, toggleContent })
            : children}
      </div>
   );
};

export default PopoverFooter;
