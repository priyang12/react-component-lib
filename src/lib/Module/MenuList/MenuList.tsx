import { SingleMenu } from './SingleMenu';
import * as React from 'react';
import { clsx } from 'clsx';
import { MenuItemInterface } from '../../Atoms/MenuItem/MenuItem';
import './MenuList.scss';

interface BaseMenuListProps {
   Dir?: 'Hor' | 'Ver';
   Joined?: boolean;
   MenuItem: any;
}

interface SingleMenu extends BaseMenuListProps {
   items: MenuItemInterface[];
   Grouped: false;
}

interface GroupedMenu extends BaseMenuListProps {
   Grouped: true;
   items: Array<{ title?: string; items: MenuItemInterface[] }>;
}

function MenuList({
   items,
   Dir = 'Hor',
   Joined = false,
   MenuItem,
   Grouped,
   className,
   ...props
}: (GroupedMenu | SingleMenu) & React.ComponentPropsWithoutRef<'ul'>) {
   const MenuListClasses = clsx(
      'MenuList',
      className,
      Dir === 'Hor' ? '' : 'flex-col'
   );
   const borderRadiusRegex = /rounded-\S+/g;
   const borderRadiusClasses = className?.match(borderRadiusRegex)?.join(' ');
   const BorderSkip = Dir === 'Hor' ? 'rounded-r-none' : 'rounded-b-none';
   const Border2Skip = Dir === 'Hor' ? 'rounded-l-none' : 'rounded-t-none';
   if (!Grouped) {
      return (
         <SingleMenu
            MenuItem={MenuItem}
            MenuListClasses={MenuListClasses}
            Joined={Joined}
            borderRadiusClasses={borderRadiusClasses}
            BorderSkip={BorderSkip}
            Border2Skip={Border2Skip}
            items={items}
            {...props}
         />
      );
   } else {
      return (
         <ul className={MenuListClasses} {...props}>
            {items.map((groupedItem, index) => {
               return (
                  <div className="group-menu">
                     <li className="menu-title">
                        <span>{groupedItem.title}</span>
                     </li>
                     <SingleMenu
                        MenuListClasses={MenuListClasses}
                        Joined={Joined}
                        borderRadiusClasses={borderRadiusClasses}
                        BorderSkip={BorderSkip}
                        Border2Skip={Border2Skip}
                        items={groupedItem.items}
                        MenuItem={MenuItem}
                        {...props}
                     />
                  </div>
               );
            })}
         </ul>
      );
   }
}
export default MenuList;
