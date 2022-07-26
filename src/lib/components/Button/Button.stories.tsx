import Button from './Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Atoms/Button',
   component: Button,

   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
   text: 'Button',
};

export const Variant = Template.bind({});
Variant.args = {
   text: 'Primary Button',
   radius: '10px',
   variant: 'primary',
};

export const BorderVariant = Template.bind({});
BorderVariant.args = {
   text: 'Border Variant Button',
   variant: 'primary-border',
};

export const CustomColorVariant = Template.bind({});
CustomColorVariant.args = {
   text: 'Custom Color Variant Button',
   variant: 'primary-border',
   style: {
      color: '#333',
   },
};

export const Radius = Template.bind({});
Radius.args = {
   text: 'Radius Button',
   radius: '10px',
};

export const LongText = Template.bind({});
LongText.args = {
   text: 'This is a very long text that should be truncated',
   ellipsis: true,
   style: {
      width: '30%',
   },
};
