import * as React from 'react';

export function Slot({ children, ...props }: { children: React.ReactNode }) {
   if (React.isValidElement(children)) {
      if (React.Children.count(children) > 1) {
         throw Error('on asChild only One element should passed!');
      }
      return React.cloneElement(children, {
         ...props,
         ...children.props,
      });
   }
   return null;
}
