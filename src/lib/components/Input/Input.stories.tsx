import Input from './index';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Atoms/Input',
   component: Input,
   args: {
      type: 'text',
      placeholder: 'Search the Product',
      id: 'search',
   },
} as ComponentMeta<typeof Input>;

export const Template: ComponentStory<typeof Input> = (args) => (
   <Input {...args} />
);

export const Medium = Template.bind({});
Medium.args = {
   size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
   size: 'large',
   required: true,
};
