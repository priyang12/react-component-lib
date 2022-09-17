import {
   Calendar,
   CalendarBody,
   CalendarDays,
   CalendarFooter,
   CalendarMonths,
   CalendarTitle,
} from './Calendar';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

export default {
   title: 'Atoms/Calendar',
   component: Calendar,
   args: {
      className: 'date-picker-cal',
   },
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Calendar>;

export const Template: ComponentStory<typeof Calendar> = args => {
   const [selectedDate, setSelectedDate] = React.useState(new Date());
   return (
      <Calendar
         {...args}
         selectedDate={selectedDate}
         setSelectedDate={setSelectedDate}
      >
         {/* @ts-ignore */}
         <CalendarTitle selectedDate={selectedDate} id="CalendarTitle" />
         <CalendarBody>
            <CalendarMonths />
            <CalendarDays
               id="CalendarDays"
               selectedDate={selectedDate}
               setSelectedDate={setSelectedDate}
            />
         </CalendarBody>
         <CalendarFooter setSelectedDate={setSelectedDate} />
      </Calendar>
   );
};

export const GlassCalendar = Template.bind({});
GlassCalendar.args = {
   className: 'glass-calendar',
};
