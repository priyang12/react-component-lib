import { ComponentMeta, ComponentStory } from '@storybook/react';
import Label from './index';
export default {
   title: 'Atoms/Label',
   component: Label,
   args: {
      children: 'Search',
      htmlFor: 'search',
      id: 'search',
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Label>;

export const Template: ComponentStory<typeof Label> = (args) => (
   <Label {...args} />
);

export const hiddenLabel = Template.bind({});
hiddenLabel.args = {
   hidden: true,
};

export const SizeLabel = Template.bind({});
SizeLabel.args = {
   size: 'large',
};

export const AlertLabel = Template.bind({});
AlertLabel.args = {
   alert: 'Alert',
};
