import Input from './Input';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Atoms/Input',
   component: Input,
   args: {
      InputSize: 'medium',
      type: 'text',
   },
} as ComponentMeta<typeof Input>;

export const Template: ComponentStory<typeof Input> = args => (
   <Input {...args} />
);

export const Size = Template.bind({});
Size.args = {
   InputSize: 'small',
};
