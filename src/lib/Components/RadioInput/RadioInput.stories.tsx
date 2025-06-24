import type { Meta, StoryFn } from '@storybook/react';
import RadioInput from './RadioInput';
import { useToggle } from '../../../Hooks';
import { Label } from '../Label';

export default {
   title: 'General/RadioInput',
   component: RadioInput,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof RadioInput>;

export const Template: StoryFn<typeof RadioInput> = (args) => {
   const [state, toggleState] = useToggle();

   return (
      <RadioInput
         {...args}
         name="options"
         value="option1"
         checked={state}
         onChange={() => {
            toggleState();
         }}
         renderLabel={() => <Label htmlFor="option1">Select Value</Label>}
      />
   );
};

export const Checked = () => (
   <RadioInput
      id="radio-checked"
      name="group"
      value="checked"
      checked
      onChange={() => {}}
      renderLabel={() => (
         <label htmlFor="radio-checked" className="radio-input__label">
            Checked
         </label>
      )}
   />
);

export const Disabled = () => (
   <RadioInput
      id="radio-disabled"
      name="group"
      value="disabled"
      disabled
      onChange={() => {}}
      renderLabel={() => (
         <label htmlFor="radio-disabled" className="radio-input__label">
            Disabled
         </label>
      )}
   />
);
