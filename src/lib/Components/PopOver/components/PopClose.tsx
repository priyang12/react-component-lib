import * as React from 'react';
import { IoMdClose } from 'react-icons/io';
import { usePopContext } from './PopContainer';

export interface PopCloseProps extends React.ComponentPropsWithoutRef<'div'> {}

const PopClose = ({ className, ...props }: PopCloseProps) => {
   const { setContentState } = usePopContext();

   return (
      <div
         className={`pop-close ${className}`}
         tabIndex={0}
         role="button"
         aria-label="Close"
         onClick={() => setContentState(false)}
         onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
               setContentState(false);
               e.preventDefault();
            }
         }}
         {...props}
      >
         <IoMdClose />
      </div>
   );
};

export default PopClose;
