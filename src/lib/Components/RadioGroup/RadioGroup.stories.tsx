import type { Meta, StoryFn } from '@storybook/react';
import RadioGroup from './RadioGroup';
import { RadioInput } from '../RadioInput';
import { Label } from '../Label';

export default {
   title: 'Components/RadioGroup',
   component: RadioGroup,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof RadioGroup>;

export const Template: StoryFn<typeof RadioGroup> = (args) => (
   <RadioGroup name="myOptions" {...args}>
      <div className="flex items-center justify-center gap-5">
         <RadioInput
            id="1"
            value="1"
            renderLabel={() => <Label htmlFor="1">select 1</Label>}
         />
      </div>
      <div className="flex items-center justify-center gap-5">
         <RadioInput
            id="2"
            value="2"
            renderLabel={() => <Label htmlFor="2">select 2</Label>}
         />
      </div>
      <div className="flex items-center justify-center gap-5">
         <RadioInput
            id="3"
            value="3"
            renderLabel={() => <Label htmlFor="3">select 3</Label>}
         />
      </div>
   </RadioGroup>
);

export const defaultValue: StoryFn<typeof RadioGroup> = Template.bind({});
defaultValue.args = {
   defaultValue: '2',
};

export const radioChangeEvent: StoryFn<typeof RadioGroup> = Template.bind({});
radioChangeEvent.args = {
   handleRadioChange: (value) => console.log(value),
};

export const Layout: StoryFn<typeof RadioGroup> = Template.bind({});
radioChangeEvent.args = {
   layout: 'horizontal',
};
