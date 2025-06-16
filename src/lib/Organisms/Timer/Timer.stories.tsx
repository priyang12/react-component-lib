import Timer from './Timer';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Organisms/Timer',
   component: Timer,
   args: {
      StartTime: 0,
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Timer>;

export const Template: StoryFn<typeof Timer> = (args) => <Timer {...args} />;

export const CounterHidden = Template.bind({});
CounterHidden.args = {
   StartTime: 456,
   Hidden: true,
};
