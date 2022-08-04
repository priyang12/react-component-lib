import FormInput from './FormInput';
import Label from '../../Atoms/Label';
import Input from '../../Atoms/Input';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextArea from '../../Atoms/TextArea';

export default {
   title: 'Module/FormInput',
   component: FormInput,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof FormInput>;

export const Template: ComponentStory<typeof FormInput> = args => (
   <FormInput {...args}>
      <Label htmlFor="Search" size="medium" alert="Alert">
         Search
      </Label>
      <Input type="text" id="Search" InputSize="large" />
   </FormInput>
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

export const Textarea: ComponentStory<typeof FormInput> = args => (
   <FormInput {...args}>
      <Label htmlFor="Search" size="medium" alert="Alert">
         Search
      </Label>
      <TextArea resize="both" Size="medium" />
   </FormInput>
);
