import Input from './Input';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Components/Input',
   component: Input,
   args: {
      InputSize: 'medium',
      type: 'text',
   },
} as Meta<typeof Input>;

export const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Size = Template.bind({});
Size.args = {
   InputSize: 'small',
};
