import { Calendar } from './Calendar';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

export default {
   title: 'Atoms/Calendar',
   component: Calendar,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Calendar>;

export const Template: ComponentStory<typeof Calendar> = args => {
   const [selectedDate, setSelectedDate] = React.useState(new Date());
   return (
      <Calendar
         {...args}
         selectedDate={selectedDate}
         setSelectedDate={setSelectedDate}
      />
   );
};
