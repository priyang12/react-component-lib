import MenuItem from './MenuItem';
import { FaAddressCard } from 'react-icons/fa';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Atoms/MenuItem',
   component: MenuItem,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof MenuItem>;

export const Template: ComponentStory<typeof MenuItem> = args => (
   <MenuItem {...args} Element="li" className="text-5xl">
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
