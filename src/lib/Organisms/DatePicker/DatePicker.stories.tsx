import DatePicker from './DatePicker';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Organisms/DatePicker',
   component: DatePicker,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof DatePicker>;

export const Template: ComponentStory<typeof DatePicker> = args => (
   <DatePicker {...args} />
);
