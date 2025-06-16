import { ProgressBar, ProgressBarLabel } from './index';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Atoms/ProgressBar',
   component: ProgressBar,
   args: {
      value: 50,
      max: 100,
      min: 0,
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof ProgressBar>;

export const Template: StoryFn<typeof ProgressBar> = (args) => (
   <ProgressBar {...args}>
      <ProgressBarLabel label="50%" />
   </ProgressBar>
);
