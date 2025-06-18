import * as React from 'react';
import { Button } from '../../Components/Button';
import { BsFillCalendarCheckFill, BsDoorClosed } from 'react-icons/bs';
import { DateField } from '../../Module/DateField';

import {
   FaAngleDoubleLeft,
   FaAngleLeft,
   FaAngleRight,
   FaAngleDoubleRight,
   FaCalendarAlt,
} from 'react-icons/fa';
import {
   CalendarWeeks,
   CalendarBody,
   CalendarDays,
   CalendarFooter,
   CalendarTitle,
   Calendar,
} from '../../Components/Calendar/Calendar';
import './DatePicker.scss';

function DatePicker({ children, ...props }: { children?: React.ReactNode }) {
   const [showCalendar, setShowCalendar] = React.useState(true);
   const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

   return (
      <div className="datePicker" {...props}>
         <div className="DatePicker-DateField">
            <DateField
               date={selectedDate}
               setDate={setSelectedDate}
               label={'Date'}
               id={'Date'}
               className={'dateField'}
               ShouldSeparate
            />
            <Button
               variant="primary-border"
               title="Calendar Icon"
               onClick={() => setShowCalendar(!showCalendar)}
            >
               {!showCalendar ? <BsFillCalendarCheckFill /> : <BsDoorClosed />}
            </Button>
         </div>

         {showCalendar && (
            <Calendar
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
         )}

         {children}
      </div>
   );
}
export default DatePicker;
