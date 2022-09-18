import * as React from 'react';
import { Input } from '../../Atoms/Input';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import './DatePicker.scss';
import { Button } from '../../Atoms';
import {
   Calendar,
   CalendarBody,
   CalendarDays,
   CalendarFooter,
   CalendarMonths,
   CalendarTitle,
} from '../../Atoms/Calendar';
function DatePicker() {
   const [showCalendar, setShowCalendar] = React.useState(true);
   const [selectedDate, setSelectedDate] = React.useState(new Date());

   return (
      <div className="datePicker">
         <Input
            type={'text'}
            InputSize="large"
            value={selectedDate.toDateString()}
            disabled
         />
         <Button
            variant="primary-border"
            onClick={() => setShowCalendar(!showCalendar)}
         >
            <BsFillCalendarCheckFill
               className="calendar-icon"
               role={'checkbox'}
            />
         </Button>
         {showCalendar && (
            <Calendar
               className="date-picker-cal"
               selectedDate={selectedDate}
               setSelectedDate={setSelectedDate}
            >
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
         )}
      </div>
   );
}
export default DatePicker;
