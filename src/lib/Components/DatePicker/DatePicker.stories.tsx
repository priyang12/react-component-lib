import DatePicker from './DatePicker';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Components/DatePicker',
   component: DatePicker,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof DatePicker>;

export const Template: StoryFn<typeof DatePicker> = (args) => (
   <DatePicker {...args} />
);
