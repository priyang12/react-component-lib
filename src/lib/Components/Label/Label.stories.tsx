import type { Meta, StoryFn } from '@storybook/react';
import Label from './Label';
import { FormControlContext } from '../FormControl/FormControl';
export default {
   title: 'Components/Label',
   component: Label,
   decorators: [
      (Story) => (
         <div className="container">
            <Story />
         </div>
      ),
   ],
} as Meta<typeof Label>;

export const Template: StoryFn<typeof Label> = (args) => (
   <Label id="search" htmlFor="search" {...args}>
      Input Label
   </Label>
);

export const hiddenLabel = Template.bind({});
hiddenLabel.args = {
   hidden: true,
};

export const SizeLabel = Template.bind({});
SizeLabel.args = {
   size: 'large',
};

export const WithContextAlert = () => (
   <FormControlContext.Provider
      value={
         {
            Alert: 'Required field',
            LabelCheck: false,
            overlay: false,
         } as any
      }
   >
      <Label htmlFor="email">Email</Label>
   </FormControlContext.Provider>
);
