import FormControl from './FormControl';
import Label from '../../Atoms/Label/Label';
import Input from '../../Atoms/Input/Input';
import TextArea from '../../Atoms/TextArea/TextArea';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Module/FormControl',
   component: FormControl,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof FormControl>;

export const Template: StoryFn<typeof FormControl> = (args) => (
   <FormControl {...args}>
      <Label htmlFor="Search" size="medium" alert="Alert">
         Search
      </Label>
      <Input type="text" id="Search" InputSize="large" />
   </FormControl>
);

export const OverlayInput = Template.bind({});

OverlayInput.args = {
   overlay: true,
};

export const Textarea: StoryFn<typeof FormControl> = (args) => (
   <FormControl {...args}>
      <Label htmlFor="Search" size="medium" alert="Alert">
         Search
      </Label>
      <TextArea id="textarea" resize="both" Size="medium" />
   </FormControl>
);
