import Slider from './Slider';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

export default {
   title: 'Components/Slider',
   component: Slider,
   args: {
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      variant: 'info',
   },
   decorators: [
      (Story) => (
         <div className="container">
            <Story />
         </div>
      ),
   ],
} as Meta<typeof Slider>;

export const Template: StoryFn<typeof Slider> = (args) => {
   const [value, setValue] = useState(args.value);
   return <Slider {...args} value={value} onChange={setValue} />;
};

export const SuccessVariant = Template.bind({});
SuccessVariant.args = {
   variant: 'success',
   value: 70,
};

export const FailureVariant = Template.bind({});
FailureVariant.args = {
   variant: 'failure',
   value: 30,
};

export const WarningVariant = Template.bind({});
WarningVariant.args = {
   variant: 'warning',
   value: 90,
};
