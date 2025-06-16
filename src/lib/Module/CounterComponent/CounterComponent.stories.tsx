import CounterComponent from './CounterComponent';
import type { Meta, StoryFn } from '@storybook/react';
export default {
   title: 'Module/CounterComponent',
   component: CounterComponent,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof CounterComponent>;
export const Template: StoryFn<typeof CounterComponent> = (args) => (
   <CounterComponent {...args} />
);
