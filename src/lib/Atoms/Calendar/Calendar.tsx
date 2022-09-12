import {
   endOfMonth,
   format,
   getDay,
   getDaysInMonth,
   setDate,
   startOfMonth,
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

function CalendarTitle({ selectedDate }: { selectedDate?: Date }) {
   return (
      <div className="calender-title">
         <div className="icons">
            <div
               className="iconContainer"
               tabIndex={0}
               //   onClick={setPreviousYear}
               //   onKeyPress={e => handleKeyPress(e, setPreviousYear)}
               role="button"
               aria-label="Previous year"
            >
               <FaAngleDoubleLeft />
            </div>
            <div
               tabIndex={0}
               className="iconContainer"
               //   onClick={setPreviousMonth}
               //   onKeyPress={e => handleKeyPress(e, setPreviousMonth)}
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
               //   onClick={setNextMonth}
               //   onKeyPress={e => handleKeyPress(e, setNextMonth)}
               role="button"
               aria-label="Next year"
            >
               <FaAngleRight />
            </div>
            <div
               className="iconContainer"
               tabIndex={0}
               //   onClick={setNextYear}
               //   onKeyPress={e => handleKeyPress(e, setNextYear)}
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

   //    const setPreviousMonth = () => {
   //       const previousMonth = subMonths(selectedDate, 1);
   //       setStartDate(startOfMonth(previousMonth));
   //    };
   //    const setNextMonth = () => {
   //       const nextMonth = addMonths(selectedDate, 1);
   //       setStartDate(startOfMonth(nextMonth));
   //    };
   //    const setPreviousYear = () => {
   //       const previousYear = subYears(selectedDate, 1);
   //       setStartDate(startOfMonth(previousYear));
   //    };
   //    const setNextYear = () => {
   //       const nextYear = addYears(selectedDate, 1);
   //       setStartDate(startOfMonth(nextYear));
   //    };
   //    const handleKeyPress = (e, cb) => {
   //       const charCode = e.charCode;
   //       if (charCode === 13 || charCode === 32) {
   //          cb();
   //       }
   //    };

   console.log(generateMonth());

   return (
      <div className="calendar" {...props}>
         <CalendarTitle selectedDate={selectedDate} />
         <CalendarBody>
            <tbody className="calendar-days">
               {generateMonth().map((week, index) => (
                  <tr key={index} role="row" className="week">
                     {week.map((day, index) =>
                        day ? (
                           <td
                              key={index}
                              role="gridcell"
                              aria-label={day && format(day, 'dd MMMM yyyy')}
                              className="box day"
                           >
                              {day && format(day, 'd')}
                           </td>
                        ) : (
                           <td
                              key={index}
                              role="gridcell"
                              aria-label={day && format(day, 'dd MMMM yyyy')}
                              className="box empty"
                           ></td>
                        )
                     )}
                     {/* <div key={index} className="week">
                     {week.map((day, index) =>
                        day ? (
                           <div key={index} className="day box">
                              {format(day, 'd')}
                           </div>
                        ) : (
                           <div key={index} className="empty box"></div>
                        )
                     )}
                  </div> */}
                  </tr>
               ))}
            </tbody>
         </CalendarBody>
      </div>
   );
};
export { Calendar, CalendarBody, CalendarTitle };
