import * as React from 'react';
import Input from '../../Atoms/Input';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import './DatePicker.scss';
import { Button } from '../../Atoms';
import { Calendar, Days, Footer, Months, Title } from '../../Atoms/Calendar';
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
               <Title selectedDate={selectedDate} id="CalendarTitle" />
               <Months>
                  <Days
                     id="CalendarDays"
                     selectedDate={selectedDate}
                     setSelectedDate={setSelectedDate}
                  />
               </Months>
               <Footer setSelectedDate={setSelectedDate} />
            </Calendar>
         )}
      </div>
   );
}
export default DatePicker;
