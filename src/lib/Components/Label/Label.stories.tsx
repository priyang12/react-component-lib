import type { Meta, StoryFn } from '@storybook/react';
import Label from './Label';
export default {
   title: 'Components/Label',
   component: Label,
   args: {
      children: 'Search',
      htmlFor: 'search',
      id: 'search',
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Label>;

export const Template: StoryFn<typeof Label> = (args) => <Label {...args} />;

export const hiddenLabel = Template.bind({});
hiddenLabel.args = {
   hidden: true,
};

export const SizeLabel = Template.bind({});
SizeLabel.args = {
   size: 'large',
};

// fix alert
// export const AlertLabel = Template.bind({});
// AlertLabel.args = {
//    alert: 'Alert',
// };
