import {
   Calendar,
   CalendarBody,
   CalendarDays,
   CalendarFooter,
   CalendarWeeks,
   CalendarTitle,
} from './Calendar';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
   FaAngleDoubleLeft,
   FaAngleLeft,
   FaAngleRight,
   FaAngleDoubleRight,
   FaCalendarAlt,
} from 'react-icons/fa';
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
