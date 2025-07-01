import * as React from 'react';
import { usePopContext } from './PopContainer';
import clsx from 'clsx';
import ReactFocusLock from 'react-focus-lock';

export interface PopContentProps extends React.ComponentPropsWithoutRef<'div'> {
   asChild?: boolean;
}

const PopContent = ({
   className,
   children,
   asChild = false,
   ...props
}: PopContentProps) => {
   const { showContent, setFloating, floatingStyles } = usePopContext();

   if (!showContent) return null;

   if (asChild && React.isValidElement(children)) {
      const mergedStyles = {
         ...(children.props.style ?? {}),
         ...floatingStyles,
      };

      return (
         <ReactFocusLock returnFocus>
            {React.cloneElement(children, {
               ...props,
               // @ts-ignore
               ref: setFloating,
               style: mergedStyles,
               className: clsx(children.props.className, className),
            })}
         </ReactFocusLock>
      );
   }

   return (
      <ReactFocusLock>
         <div
            ref={setFloating}
            className={clsx('popContent', className)}
            style={{
               ...floatingStyles,
            }}
            {...props}
         >
            {children}
         </div>
      </ReactFocusLock>
   );
};

export default PopContent;
