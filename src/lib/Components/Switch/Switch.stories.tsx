import Switch from './Switch';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useToggle } from '../../../Hooks';
import { Label } from '../Label';

export default {
   title: 'Components/Switch',
   component: Switch,
   decorators: [(story) => <div className="container">{story()}</div>],
   tags: ['autodocs'],
} as Meta<typeof Switch>;

export const Template: StoryFn<typeof Switch> = (args) => {
   const [Value, ToggleValue] = useToggle(false);
   return <Switch {...args} isOn={Value} flipSwitch={ToggleValue} />;
};

type SwitchType = StoryObj<typeof Switch>;

// Disabled
export const Disabled: SwitchType = {
   args: {
      disabled: true,
   },
};

export const Sizes = Template.bind({});
Sizes.args = {
   switchSize: 'large',
};

export const withLabel: StoryFn<typeof Switch> = (args) => {
   const [Value, ToggleValue] = useToggle(false);
   return (
      <div className="flex gap-5 items-center">
         <Label htmlFor="Switch">Switch : </Label>
         <Switch {...args} isOn={Value} flipSwitch={ToggleValue} id="Switch" />
      </div>
   );
};
