import DatePicker from './DatePicker';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Input } from '../../Atoms/Input';
import { BsFillCalendarCheckFill, BsDoorClosed } from 'react-icons/bs';
import { Button } from '../../Atoms';
import {
   Calendar,
   CalendarBody,
   CalendarDays,
   CalendarMonths,
   CalendarTitle,
} from '../../Atoms/Calendar';

export default {
   title: 'Module/DatePicker',
   component: DatePicker,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof DatePicker>;

export const Template: ComponentStory<typeof DatePicker> = args => {
   const [showCalendar, setShowCalendar] = React.useState(true);
   const [selectedDate, setSelectedDate] = React.useState(new Date());
   return (
      <DatePicker {...args}>
         <Input
            type={'text'}
            InputSize="large"
            onClick={() => setShowCalendar(!showCalendar)}
            value={selectedDate.toDateString()}
            disabled={showCalendar}
         />
         <Button
            variant="primary-border"
            onClick={() => setShowCalendar(!showCalendar)}
         >
            {!showCalendar ? <BsFillCalendarCheckFill /> : <BsDoorClosed />}
         </Button>
         {showCalendar && (
            <Calendar
               top="100%"
               left="0"
               w="100%"
               position="absolute"
               selectedDate={selectedDate}
               setSelectedDate={setSelectedDate}
            >
               <CalendarTitle m="1px" />
               <CalendarBody>
                  <CalendarMonths />
                  <CalendarDays
                     selectedDate={selectedDate}
                     setSelectedDate={setSelectedDate}
                  />
               </CalendarBody>
            </Calendar>
         )}
      </DatePicker>
   );
};
