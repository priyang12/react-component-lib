import Switch from './Switch';
import type { Meta, StoryFn } from '@storybook/react';
import { useToggle } from '../../../Hooks';

export default {
   title: 'Components/Switch',
   component: Switch,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Switch>;

export const Template: StoryFn<typeof Switch> = (args) => {
   const [Value, ToggleValue] = useToggle(false);
   return <Switch {...args} isOn={Value} setIsOn={ToggleValue} />;
};
