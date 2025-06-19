import FormControl from './FormControl';
import { Label } from '../../Components/Label';
import { Input } from '../../Components/Input';
import { TextArea } from '../../Components/TextArea';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

export default {
   title: 'Components/FormControl',
   component: FormControl,
   decorators: [
      (Story) => (
         <div className="container">
            <Story />
         </div>
      ),
   ],
} as Meta<typeof FormControl>;

export const Template: StoryFn<typeof FormControl> = (args) => (
   <FormControl {...args}>
      <Label htmlFor="Search" size="large">
         Search
      </Label>
      <Input type="text" id="Search" InputSize="large" />
   </FormControl>
);

export const noValidation = Template.bind({});

noValidation.args = {
   required: false,
};

export const CustomValidation = Template.bind({});

CustomValidation.args = {
   validate(value) {
      if (value.length > 5) return 'Too much short it up!';
      return '';
   },
};

export const OverlayInput = Template.bind({});

OverlayInput.args = {
   overlay: true,
};

export const Textarea: StoryFn<typeof FormControl> = (args) => (
   <FormControl {...args}>
      <Label htmlFor="Search" size="medium">
         Search
      </Label>
      <TextArea id="textarea" resize="both" Size="medium" />
   </FormControl>
);
