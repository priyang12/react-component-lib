import * as React from 'react';
import FormControl from './FormControl';
import { Label } from '../../Components/Label';
import { Input } from '../../Components/Input';
import { TextArea } from '../../Components/TextArea';
import { Slider } from '../Slider';
import { Select } from '../Select';
import { Options } from '../Select';
import type { Meta, StoryFn } from '@storybook/react';
import { Template as Switch } from '../Switch/Switch.stories';
import { useToggle } from '../../../Hooks';
import { FakeCountryData } from '../Select/FakeCountryData';

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
      <TextArea id="textarea" resize="both" size="medium" />
   </FormControl>
);

export const SwitchControl: StoryFn<typeof FormControl> = (args) => {
   const { value: Value, toggleValue: ToggleValue } = useToggle(false);

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

export const SelectControl: StoryFn<typeof FormControl> = (args) => (
   <FormControl
      {...args}
      className="flex flex-col"
      validate={(value) => {
         return value.charAt(0).toLocaleLowerCase() !== 'a'
            ? 'Please select only with A'
            : '';
      }}
   >
      <Select
         initialValue="Select"
         name="Countries"
         id="Countries"
         inputSize="medium"
         options={FakeCountryData.map((item) => {
            return {
               label: item.name,
               value: item.code,
            };
         })}
         renderLabel={({ selectedValue }) => (
            <Label htmlFor="Search" size="medium">
               Select only with latter A: {selectedValue}
            </Label>
         )}
         renderOptions={({
            filteredOptions,
            focusedIndex,
            selectedOption,
            setFocusedIndex,
            selectValue,
            toggle,
         }) => (
            <Options
               filteredOptions={filteredOptions}
               selectValue={selectValue}
               toggle={toggle}
               focusedIndex={focusedIndex}
               selectedOption={selectedOption}
               setFocusedIndex={setFocusedIndex}
            />
         )}
         required={false}
      />
   </FormControl>
);
