import { clsx } from 'clsx';
import * as React from 'react';
import './MenuItem.scss';

export interface MenuItemInterface {
   icon: React.ReactNode;
   command: string;
}

const MenuItem = <T extends React.ElementType>({
   Element = 'div',
   icon,
   command,
   children,
   ...props
}: {
   Element: T | 'div';
} & MenuItemInterface &
   React.ComponentPropsWithoutRef<T>) => {
   const MenuItemClasses = clsx('MenuItem', props.className);

   return (
      <Element {...props} className={MenuItemClasses} role="menuitem">
         {icon ? <div className="Icon">{icon}</div> : null}
         {children}
         {command ? <div className="command">{command}</div> : null}
      </Element>
   );
};

export default MenuItem;
