import { ProgressBar, ProgressBarLabel } from './index';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Atoms/ProgressBar',
   component: ProgressBar,
   args: {
      value: 50,
      max: 100,
      min: 0,
   },
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof ProgressBar>;

export const Template: ComponentStory<typeof ProgressBar> = args => (
   <ProgressBar {...args}>
      <ProgressBarLabel label="50%" />
   </ProgressBar>
);
