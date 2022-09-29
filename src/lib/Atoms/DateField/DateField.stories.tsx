import DateField from './DateField';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
   title: 'Atoms/DateField',
   component: DateField,
   args: {
      label: 'Date',
      id: 'date',
   },
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof DateField>;

export const Template: ComponentStory<typeof DateField> = args => (
   <DateField {...args} />
);
