import CounterComponent from './CounterComponent';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
   title: 'Module/CounterComponent',
   component: CounterComponent,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof CounterComponent>;
export const Template: ComponentStory<typeof CounterComponent> = args => (
   <CounterComponent {...args} />
);
