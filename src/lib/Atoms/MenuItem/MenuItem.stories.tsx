import MenuItem from './MenuItem';
import { FaAddressCard } from 'react-icons/fa';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Atoms/MenuItem',
   component: MenuItem,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof MenuItem>;

export const Template: StoryFn<typeof MenuItem> = (args) => (
   <MenuItem {...args} Element="li">
      Item 1
   </MenuItem>
);

export const WithIcon = Template.bind({});
WithIcon.args = {
   icon: <FaAddressCard />,
};

export const Command = WithIcon.bind({});
Command.args = {
   command: '⌘N',
};
