import { clsx } from 'clsx';
import * as React from 'react';
import './MenuItem.scss';

/**
 * Interface for MenuItem props
 */
export interface MenuItemInterface {
   icon?: React.ReactNode;
   children?: React.ReactNode;
   active?: boolean;
   disable?: boolean;
   command?: string;
}

/**
 * Reusable MenuItem component
 * @param Element - JSX element to render the component as (default: 'div')
 * @param icon - Icon to display
 * @param active - active element true/false
 * @param disable - disable element true/false
 * @param command - command to display
 * @param children - Content to display within the component
 * @param props - Additional props to pass through
 */

const MenuItem = <T extends React.ElementType>({
   Element = 'div',
   active,
   icon,
   disable,
   command,
   children,
   ...props
}: {
   Element: T | 'div';
} & MenuItemInterface &
   React.ComponentPropsWithoutRef<T>) => {
   const MenuItemClasses = clsx(
      'MenuItem',
      active ? 'active' : 'Inactive',
      disable ? 'disable' : null,
      props.className
   );

   return (
      <Element
         {...props}
         className={MenuItemClasses}
         role="menuitem"
         aria-disabled={disable}
      >
         {icon ? <div className="Icon">{icon}</div> : null}
         {children}
         {command ? <div className="command">{command}</div> : null}
      </Element>
   );
};

export default MenuItem;
