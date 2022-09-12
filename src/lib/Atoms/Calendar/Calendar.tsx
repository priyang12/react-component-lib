import {
   addMonths,
   addYears,
   endOfMonth,
   format,
   getDay,
   getDaysInMonth,
   setDate,
   startOfMonth,
   subMonths,
   subYears,
} from 'date-fns';
import { chunk } from 'lodash';
import * as React from 'react';
import {
   FaAngleDoubleLeft,
   FaAngleLeft,
   FaAngleRight,
   FaAngleDoubleRight,
} from 'react-icons/fa';
import './Calendar.scss';

const DefaultDaysFormate = [
   {
      name: 'Su',
      value: 'Sunday',
   },
   {
      name: 'Mo',
      value: 'Monday',
   },
   {
      name: 'Tu',
      value: 'Tuesday',
   },
   {
      name: 'We',
      value: 'Wednesday',
   },
   {
      name: 'Th',
      value: 'Thursday',
   },
   {
      name: 'Fr',
      value: 'Friday',
   },
   {
      name: 'Sa',
      value: 'Saturday',
   },
];

function CalendarBody({
   DaysFormate = DefaultDaysFormate,
   children,
}: {
   DaysFormate?: typeof DefaultDaysFormate;
   children: React.ReactNode;
}) {
   return (
      <table
         id="grid"
         tabIndex={0}
         role="grid"
         aria-label="Month"
         className="Months"
      >
         <thead>
            <tr role="row">
               {DaysFormate.map((day, index) => (
                  <th
                     key={index}
                     role="columnheader"
                     aria-label={day.value}
                     className="box"
                  >
                     <abbr title={day.value}>{day.name}</abbr>
                  </th>
               ))}
            </tr>
         </thead>
         {children}
      </table>
   );
}

function CalendarTitle({
   selectedDate,
   handleKeyPress,
   setPreviousYear,
   setNextMonth,
   setPreviousMonth,
   setNextYear,
}: {
   selectedDate?: Date;
   handleKeyPress: (
      event: React.KeyboardEvent<HTMLDivElement>,
      fn: () => void
   ) => void;
   setPreviousYear: () => void;
   setNextMonth: () => void;
   setPreviousMonth: () => void;
   setNextYear: () => void;
}) {
   return (
      <div className="calender-title">
         <div className="icons">
            <div
               className="iconContainer"
               tabIndex={0}
               onClick={setPreviousYear}
               onKeyPress={e => handleKeyPress(e, setPreviousYear)}
               role="button"
               aria-label="Previous year"
            >
               <FaAngleDoubleLeft />
            </div>
            <div
               tabIndex={0}
               className="iconContainer"
               onClick={setPreviousMonth}
               onKeyPress={e => handleKeyPress(e, setPreviousMonth)}
               role="button"
               aria-label="Previous month"
            >
               <FaAngleLeft />
            </div>
         </div>
         <div className="month" role="heading">
            {selectedDate && format(selectedDate, 'MMMM yyyy')}
         </div>
         <div className="icons">
            <div
               className="iconContainer"
               tabIndex={0}
               onClick={setNextMonth}
               onKeyPress={e => handleKeyPress(e, setNextMonth)}
               role="button"
               aria-label="Next year"
            >
               <FaAngleRight />
            </div>
            <div
               className="iconContainer"
               tabIndex={0}
               onClick={setNextYear}
               onKeyPress={e => handleKeyPress(e, setNextYear)}
               role="button"
               aria-label="Next year"
            >
               <FaAngleDoubleRight />
            </div>
         </div>
      </div>
   );
}

export type CalendarProps = {
   date: Date;
};

const Calendar = ({ date, ...props }: CalendarProps) => {
   const [selectedDate, setSelectedDate] = React.useState(new Date(date));
   const generateMonth = () => {
      const daysInMonth = getDaysInMonth(selectedDate);
      const startWeekday = getDay(startOfMonth(selectedDate));
      const endWeekday = getDay(endOfMonth(selectedDate));
      const gridDays = chunk(
         [
            ...Array.from({ length: startWeekday }).fill(null),
            ...Array.from({ length: daysInMonth }, (_, i) =>
               setDate(selectedDate, i + 1)
            ),
            ...Array.from({ length: 6 - endWeekday }).fill(null),
         ],
         7
      );
      return gridDays as Date[][];
   };

   const setPreviousMonth = () => {
      const previousMonth = subMonths(selectedDate, 1);
      setSelectedDate(previousMonth);
   };
   const setNextMonth = () => {
      const nextMonth = addMonths(selectedDate, 1);
      // console.log(startOfMonth(nextMonth));
      setSelectedDate(nextMonth);
   };
   const setPreviousYear = () => {
      const previousYear = subYears(selectedDate, 1);
      setSelectedDate(previousYear);
   };
   const setNextYear = () => {
      const nextYear = addYears(selectedDate, 1);
      setSelectedDate(nextYear);
   };
   const handleKeyPress = (e: any, cb: any) => {
      const charCode = e.charCode;
      if (charCode === 13 || charCode === 32) {
         cb();
      }
   };

   const SelectNewDate = (date: Date) => {
      setSelectedDate(date);
   };

   return (
      <div className="calendar" {...props}>
         <CalendarTitle
            selectedDate={selectedDate}
            handleKeyPress={handleKeyPress}
            setPreviousYear={setPreviousYear}
            setNextMonth={setNextMonth}
            setPreviousMonth={setPreviousMonth}
            setNextYear={setNextYear}
         />
         <CalendarBody>
            <tbody className="calendar-days">
               {generateMonth().map((week, index) => (
                  <tr key={index} role="row" className="week">
                     {week.map((day, index) =>
                        day ? (
                           day.getDate() === selectedDate.getDate() ? (
                              <td
                                 key={index}
                                 role="gridcell"
                                 aria-label={day && format(day, 'dd MMMM yyyy')}
                                 className="box day CurrentDay"
                              >
                                 {day.getDate()}
                              </td>
                           ) : (
                              <td
                                 key={index}
                                 role="gridcell"
                                 aria-label={day && format(day, 'dd MMMM yyyy')}
                                 className="box day"
                                 onClick={() => SelectNewDate(day)}
                              >
                                 {day.getDate()}
                              </td>
                           )
                        ) : (
                           <td
                              key={index}
                              role="gridcell"
                              aria-label={day && format(day, 'dd MMMM yyyy')}
                              className="box empty"
                           ></td>
                        )
                     )}
                  </tr>
               ))}
            </tbody>
         </CalendarBody>
      </div>
   );
};
export { Calendar, CalendarBody, CalendarTitle };
