import * as React from 'react';
import { usePopContext } from './PopContainer';
import clsx from 'clsx';

export interface PopContentProps extends React.ComponentPropsWithoutRef<'div'> {
   asChild?: boolean;
}

const PopContent = ({
   children,
   asChild = false,
   ...props
}: PopContentProps) => {
   const { showContent, setFloating, floatingStyles } = usePopContext();

   if (!showContent) return null;

   if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
         ...props,
         // @ts-ignore
         ref: setFloating,
         style: {
            ...(children.props.style ?? {}),
            ...floatingStyles,
         },
      });
   }

   return (
      <div
         ref={setFloating}
         className={clsx('popContent', props.className)}
         style={{
            ...floatingStyles,
         }}
         {...props}
      >
         {children}
      </div>
   );
};

export default PopContent;
