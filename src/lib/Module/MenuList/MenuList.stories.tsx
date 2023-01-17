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
   { icon: <FaHome />, command: '#3', children: <div>Home</div> },
   { icon: <FaUser />, command: '#r', children: <div>Profile</div> },
   { icon: <FaCog />, command: '$d', children: <div>Settings</div> },
];

export const Template: ComponentStory<typeof MenuList> = args => (
   <MenuList
      {...args}
      MenuItem={<MenuItem Element={'li'} />}
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
      MenuItem={<MenuItem Element={'li'} />}
      items={items}
      className="rounded-xl"
   />
);

const GroupedItems = [
   {
      title: 'Navigation',
      items: [
         { icon: <FaHome />, children: <div>Home</div> },
         { icon: <FaUser />, command: '#5', children: <div>Profile</div> },
      ],
   },
   {
      title: 'Settings',
      items: [
         { icon: <FaCog />, command: '#3', children: <div>Settings</div> },
      ],
   },
];

export const GroupedLists: ComponentStory<typeof MenuList> = args => (
   <MenuList
      {...args}
      MenuItem={<MenuItem Element={'li'} />}
      // Joined={true}
      Grouped={true}
      items={GroupedItems}
      className="rounded-xl gap-1"
   />
);
