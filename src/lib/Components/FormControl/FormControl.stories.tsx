import * as React from 'react';
import FormControl from './FormControl';
import { Label } from '../../Components/Label';
import { Input } from '../../Components/Input';
import { TextArea } from '../../Components/TextArea';
import type { Meta, StoryFn } from '@storybook/react';
import { Template as Switch } from '../Switch/Switch.stories';
import { useToggle } from '../../../Hooks';
import Slider from '../Slider';

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
      <Label htmlFor="Search" size="medium">
         Search
      </Label>
      <Input type="text" id="Search" InputSize="medium" />
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

export const TextareaControl: StoryFn<typeof FormControl> = (args) => (
   <FormControl {...args}>
      <Label htmlFor="Search" size="medium">
         Search
      </Label>
      <TextArea id="textarea" resize="both" Size="medium" />
   </FormControl>
);

export const SwitchControl: StoryFn<typeof FormControl> = (args) => {
   const [Value, ToggleValue] = useToggle(false);

   return (
      <FormControl
         {...args}
         style={{
            display: 'flex',
            gap: '1rem',
         }}
      >
         <Label htmlFor="my-switch">Notifications</Label>
         <Switch
            id="my-switch"
            name="notifications"
            isOn={Value}
            flipSwitch={ToggleValue}
            switchSize="medium"
         />
      </FormControl>
   );
};

export const SliderControl: StoryFn<typeof FormControl> = (args) => {
   const [value, setValue] = React.useState(50);
   return (
      <FormControl
         {...args}
         // this work but inside storybook this is not rerendering??
         // alertMessage={value < 10 ? 'More than 10!' : ''}
         validate={(value) => (Number(value) < 10 ? 'More than 10!' : '')}
      >
         <Label htmlFor="my-range">Range : {value}</Label>
         <Slider value={value} onChange={setValue} />
      </FormControl>
   );
};
