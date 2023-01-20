import Switch from './Switch';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useToggle } from '../../../Hooks';
export default {
   title: 'Atoms/Switch',
   component: Switch,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Switch>;

export const Template: ComponentStory<typeof Switch> = args => {
   const [Value, ToggleValue] = useToggle(false);

   return <Switch {...args} isOn={Value} setIsOn={ToggleValue} />;
};
