import { ProgressBar, ProgressBarLabel } from './index';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Components/ProgressBar',
   component: ProgressBar,
   args: {
      value: 50,
      max: 100,
      min: 0,
   },
   subcomponents: {
      ProgressBarLabel,
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof ProgressBar>;

export const Template: StoryFn<typeof ProgressBar> = (args) => (
   <ProgressBar
      variant="info"
      title="Progress Bar"
      aria-label="File upload progress"
      {...args}
   >
      <span className='class="h-full w-full flex items-center justify-center text-[var(--font-size-medium)] font-semibold mt-3'>
         {args.value.toString() + ' %'}
      </span>
   </ProgressBar>
);

export const LabelInsideBar: StoryFn<typeof ProgressBar> = (args) => (
   <ProgressBar {...args}>
      <ProgressBarLabel progressLabelText={`${args.value}%`} placement="left" />
   </ProgressBar>
);

export const SuccessVariant = Template.bind({});
SuccessVariant.args = {
   value: 75,
   variant: 'success-border',
};

export const ErrorVariant = Template.bind({});
ErrorVariant.args = {
   value: 30,
   variant: 'failure',
};
