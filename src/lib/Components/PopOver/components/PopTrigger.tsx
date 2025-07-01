import * as React from 'react';
import { usePopContext } from './PopContainer';
import clsx from 'clsx';

export interface PopTriggerProps extends React.ComponentPropsWithoutRef<'div'> {
   trigger?: 'click' | 'hover' | 'focus' | ('click' | 'hover' | 'focus')[];
}

const PopTrigger = ({
   className,
   children,
   trigger = 'click',
   onClick,
   onMouseEnter,
   onMouseLeave,
   onFocus,
   onBlur,
   ...props
}: PopTriggerProps) => {
   const { toggleContent, setContentState } = usePopContext();

   const triggers = Array.isArray(trigger) ? trigger : [trigger];

   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (triggers.includes('click')) toggleContent();
   };

   const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      onFocus?.(e);
      if (triggers.includes('focus')) setContentState(true);
   };

   const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      if (triggers.includes('hover')) setContentState(true);
   };

   return (
      <div
         onClick={handleClick}
         className={clsx('pop-trigger', className)}
         onMouseDown={(e) => e.preventDefault()} // to prevent firing the onfocus on click
         onFocus={handleFocus}
         onMouseEnter={handleMouseEnter}
         tabIndex={1}
         {...props}
      >
         {children}
      </div>
   );
};

export default PopTrigger;
