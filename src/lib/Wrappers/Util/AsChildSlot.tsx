import clsx from 'clsx';
import * as React from 'react';

type SlotProps = {
   children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function Slot({ children, ...props }: SlotProps) {
   if (React.isValidElement(children)) {
      if (React.Children.count(children) > 1) {
         throw Error('on asChild only One element should passed!');
      }

      return React.cloneElement(children, {
         ...props,
         ...children.props,
         // this prevent the class loss when passed in children.props also have class.
         // need to think about this more. maybe remove access to pass className when asChild is true.
         className: clsx(children.props.className, props.className),
      });
   }
   return null;
}
