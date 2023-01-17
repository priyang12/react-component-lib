import React from 'react';
import { MenuItemInterface } from '../../Atoms/MenuItem/MenuItem';

export function SingleMenu({
   items,
   Joined,
   MenuListClasses,
   BorderSkip,
   Border2Skip,
   borderRadiusClasses,
   MenuItem,
   ...props
}: {
   items: MenuItemInterface[];
   MenuListClasses: string;
   Joined: boolean;
   BorderSkip: string;
   Border2Skip: string;
   borderRadiusClasses: string | undefined;
   MenuItem: any;
} & React.ComponentPropsWithoutRef<'ul'>) {
   return (
      <ul className={MenuListClasses} {...props}>
         {items.map((item, index) => {
            let menuItemClasses;
            if (Joined) {
               if (index === 0 && 1 !== items.length)
                  menuItemClasses = borderRadiusClasses + ' ' + BorderSkip;
               else if (index === items.length - 1)
                  menuItemClasses = borderRadiusClasses + ' ' + Border2Skip;
            } else {
               menuItemClasses = borderRadiusClasses;
            }
            return (
               <>
                  {/*  still need to work on this */}
                  {React.cloneElement(MenuItem, {
                     key: index,
                     children: item.children,
                     icon: item.icon,
                     command: item.command,
                     className: menuItemClasses,
                  })}
               </>
            );
         })}
      </ul>
   );
}
