import type { Meta, StoryFn } from '@storybook/react';
import PinInput from './PinInput';

export default {
   title: 'Components/PinInput',
   component: PinInput,
   decorators: [
      (Story) => (
         <div className="container" style={{ padding: '2rem' }}>
            {Story()}
         </div>
      ),
   ],
   parameters: {
      controls: { expanded: true },
   },
} as Meta<typeof PinInput>;

const Template: StoryFn<typeof PinInput> = (args) => <PinInput {...args} />;

export const Default = Template.bind({});
Default.args = {
   length: 4,
   autoFocus: true,
};

export const SixDigit = Template.bind({});
SixDigit.args = {
   length: 6,
};

export const Disabled = Template.bind({});
Disabled.args = {
   length: 4,
   disabled: true,
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
   length: 4,
   className: 'bg-blue-500 p-5',
   inputClassName: 'custom-pin-input',
};
