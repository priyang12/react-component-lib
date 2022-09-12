import { Calendar } from './Calendar';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Atoms/Calendar',
   component: Calendar,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Calendar>;

export const Template: ComponentStory<typeof Calendar> = args => (
   <Calendar {...args} date={new Date()} />
);
