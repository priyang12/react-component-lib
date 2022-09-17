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
import { cx } from '@chakra-ui/utils';
import {
   FaAngleDoubleLeft,
   FaAngleLeft,
   FaAngleRight,
   FaAngleDoubleRight,
   FaCalendarAlt,
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

const generateMonth = (selectedDate: Date) => {
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

function CalendarTitle({
   selectedDate,
   handleKeyPress,
   setPreviousYear,
   setNextMonth,
   setPreviousMonth,
   setNextYear,
   className,
   ...props
}: {
   selectedDate?: Date;
   id?: string;
   handleKeyPress: (
      event: React.KeyboardEvent<HTMLDivElement>,
      fn: () => void
   ) => void;
   setPreviousYear: () => void;
   setNextMonth: () => void;
   setPreviousMonth: () => void;
   setNextYear: () => void;
   className?: string;
   [key: string]: any;
}) {
   return (
      <div className={cx('calendar-title', className)} {...props}>
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

function CalendarBody({
   children,
   className,
   ...props
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <table
         id="grid"
         tabIndex={0}
         role="grid"
         aria-label="calendar-body"
         className={cx('calendar-body', className)}
         {...props}
      >
         {children}
      </table>
   );
}

function CalendarMonths({
   DaysFormate = DefaultDaysFormate,
   className,
   ...props
}: {
   DaysFormate?: typeof DefaultDaysFormate;
   className?: string;
}) {
   return (
      <thead className={cx('Months', className)} {...props}>
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
   );
}

function CalendarDays({
   selectedDate,
   setSelectedDate,
   className,
   DaysStyles,
   CurrentDayStyles,
   ...props
}: {
   selectedDate: Date;
   id?: string;
   setSelectedDate: (date: Date) => void;
   DaysStyles?: {};
   CurrentDayStyles?: {};
   className?: string;
}) {
   return (
      <tbody className={cx('calendar-days', className)} {...props}>
         {generateMonth(selectedDate).map((week, index) => (
            <tr key={index} role="row" className="week">
               {week.map((day, index) =>
                  day ? (
                     day.getDate() === selectedDate.getDate() ? (
                        <td
                           key={index}
                           role="gridcell"
                           aria-label={day && format(day, 'dd MMMM yyyy')}
                           className="box day CurrentDay"
                           style={CurrentDayStyles}
                        >
                           {day.getDate()}
                        </td>
                     ) : (
                        <td
                           key={index}
                           role="gridcell"
                           aria-label={day && format(day, 'dd MMMM yyyy')}
                           className="box day"
                           onClick={() => setSelectedDate(day)}
                           style={DaysStyles}
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
                        style={DaysStyles}
                     ></td>
                  )
               )}
            </tr>
         ))}
      </tbody>
   );
}

function CalendarFooter({
   setSelectedDate,
   className,
   ...props
}: {
   setSelectedDate: (date: Date) => void;
   className?: string;
}) {
   return (
      <div className={cx('calendar-footer', className)} {...props}>
         <div className="footer-text">
            <div className="footer-text-container-title">
               <FaCalendarAlt />
               <span>Today</span>
            </div>
            <div className="footer-text-container-date">
               {format(new Date(), 'dd MMMM yyyy')}
            </div>
         </div>
         <div className="footer-text">
            <button
               className="clear-btn"
               onClick={() => {
                  setSelectedDate(new Date());
               }}
            >
               Clear
            </button>
         </div>
      </div>
   );
}
export type CalendarProps = {
   selectedDate: Date;
   setSelectedDate: (date: Date) => void;
   children?: React.ReactNode;
   className?: string;
};

const Calendar = ({
   selectedDate,
   setSelectedDate,
   children,
   className,
   ...props
}: CalendarProps) => {
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

   return (
      <div className={cx('calendar', className)} {...props}>
         {React.Children.map(children, (child: any) => {
            switch (child.props.id) {
               case 'CalendarTitle':
                  return React.cloneElement(child, {
                     setPreviousMonth,
                     setNextMonth,
                     setPreviousYear,
                     setNextYear,
                     handleKeyPress,
                  });
               default:
                  return child;
            }
         })}
      </div>
   );
};

export {
   Calendar,
   CalendarTitle,
   CalendarDays,
   CalendarFooter,
   CalendarMonths,
   CalendarBody,
};
