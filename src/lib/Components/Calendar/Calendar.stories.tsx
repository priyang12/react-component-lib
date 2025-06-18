import {
   Calendar,
   CalendarBody,
   CalendarDays,
   CalendarFooter,
   CalendarWeeks,
   CalendarTitle,
} from './Calendar';
import type { Meta, StoryFn } from '@storybook/react';
import {
   FaAngleDoubleLeft,
   FaAngleLeft,
   FaAngleRight,
   FaAngleDoubleRight,
   FaCalendarAlt,
} from 'react-icons/fa';
import * as React from 'react';

export default {
   title: 'Components/Calendar',
   component: Calendar,
   args: {
      className: 'date-picker-cal',
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Calendar>;

export const Template: StoryFn<typeof Calendar> = (args) => {
   const [selectedDate, setSelectedDate] = React.useState(new Date());
   return (
      <Calendar
         {...args}
         selectedDate={selectedDate}
         setSelectedDate={setSelectedDate}
      >
         <CalendarTitle
            DoubleLeftArrow={FaAngleDoubleLeft}
            LeftArrow={FaAngleLeft}
            RightArrow={FaAngleRight}
            DoubleRightArrow={FaAngleDoubleRight}
         />
         <CalendarBody>
            <CalendarWeeks />
            <CalendarDays />
         </CalendarBody>
         <CalendarFooter CalendarIcon={FaCalendarAlt} />
      </Calendar>
   );
};

export const GlassCalendar = Template.bind({});

GlassCalendar.args = {
   className: 'glass-calendar',
};
