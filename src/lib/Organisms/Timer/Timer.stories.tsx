import Timer from './Timer';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Organisms/Timer',
   component: Timer,
   args: {
      StartTime: 0,
   },
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Timer>;

export const Template: ComponentStory<typeof Timer> = args => (
   <Timer {...args} />
);

export const CounterHidden = Template.bind({});
CounterHidden.args = {
   StartTime: 456,
   Hidden: true,
};
