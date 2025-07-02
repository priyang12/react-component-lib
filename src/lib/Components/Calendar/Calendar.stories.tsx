import * as React from 'react';
import Calendar from './Calendar';
import {
   FaAngleDoubleLeft,
   FaAngleLeft,
   FaAngleRight,
   FaAngleDoubleRight,
   FaCalendarAlt,
} from 'react-icons/fa';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Components/Calendar',
   component: Calendar.Container,
   subcomponents: Calendar,
   args: {
      className: 'date-picker-cal',
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Calendar.Container>;

export const Template: StoryFn<typeof Calendar.Container> = (args) => {
   const [selectedDate, setSelectedDate] = React.useState(new Date());
   return (
      <Calendar.Container
         {...args}
         selectedDate={selectedDate}
         setSelectedDate={setSelectedDate}
      >
         <Calendar.Title
            DoubleLeftArrow={FaAngleDoubleLeft}
            LeftArrow={FaAngleLeft}
            RightArrow={FaAngleRight}
            DoubleRightArrow={FaAngleDoubleRight}
         />
         <Calendar.Body>
            <Calendar.Weeks />
            <Calendar.Days />
         </Calendar.Body>
         <Calendar.Footer CalendarIcon={FaCalendarAlt} />
      </Calendar.Container>
   );
};

export const GlassCalendar = Template.bind({});

GlassCalendar.args = {
   className: 'glass-calendar',
};
