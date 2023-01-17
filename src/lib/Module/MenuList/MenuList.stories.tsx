import MenuList from './MenuList';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FaCog, FaHome, FaUser } from 'react-icons/fa';
import MenuItem from '../../Atoms/MenuItem';
export default {
   title: 'Module/MenuList',
   component: MenuList,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof MenuList>;

const items = [
   { icon: <FaHome />, command: 'Home' },
   { icon: <FaUser />, command: 'Profile' },
   { icon: <FaCog />, command: 'Settings' },
];

export const Template: ComponentStory<typeof MenuList> = args => (
   <MenuList
      {...args}
      MenuItem={MenuItem}
      items={items}
      Grouped={false}
      className="rounded-none p-5"
   />
);

export const Rounded: ComponentStory<typeof MenuList> = args => (
   <MenuList
      {...args}
      Joined={true}
      Grouped={false}
      items={items}
      className="rounded-xl gap-0"
   />
);

const GroupedItems = [
   {
      title: 'Navigation',
      items: [
         { icon: <FaHome />, command: 'Home' },
         { icon: <FaUser />, command: 'Profile' },
      ],
   },
   { title: 'Settings', items: [{ icon: <FaCog />, command: 'Settings' }] },
];

export const GroupedLists: ComponentStory<typeof MenuList> = args => (
   <MenuList
      {...args}
      // Joined={true}
      Grouped={true}
      items={GroupedItems}
      className="rounded-xl gap-1"
   />
);
