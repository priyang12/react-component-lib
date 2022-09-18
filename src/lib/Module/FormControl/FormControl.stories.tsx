import FormControl from './FormControl';
import Label from '../../Atoms/Label/Label';
import Input from '../../Atoms/Input/Input';
import TextArea from '../../Atoms/TextArea/TextArea';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
   title: 'Module/FormControl',
   component: FormControl,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof FormControl>;

export const Template: ComponentStory<typeof FormControl> = args => (
   <FormControl {...args}>
      <Label htmlFor="Search" size="medium" alert="Alert">
         Search
      </Label>
      <Input type="text" id="Search" InputSize="large" />
   </FormControl>
);

export const BorderInput = Template.bind({});
BorderInput.args = {
   style: {
      border: '2px solid #333',
      padding: '1em',
   },
};

export const OverlayInput = Template.bind({});

OverlayInput.args = {
   overlay: true,
};

export const Textarea: ComponentStory<typeof FormControl> = args => (
   <FormControl {...args}>
      <Label htmlFor="Search" size="medium" alert="Alert">
         Search
      </Label>
      <TextArea resize="both" Size="medium" />
   </FormControl>
);
