import {
   addDays,
   addMonths,
   addWeeks,
   addYears,
   endOfMonth,
   format,
   getDay,
   getDaysInMonth,
   setDate,
   startOfMonth,
   subDays,
   subMonths,
   subWeeks,
} from 'date-fns';
import subYears from 'date-fns/subYears';
import chunk from 'lodash.chunk';
import * as React from 'react';
import { cx } from '@chakra-ui/utils';
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

const Keys = {
   Enter: 'Enter',
   Space: ' ',
   ArrowLeft: 'ArrowLeft',
   ArrowRight: 'ArrowRight',
   ArrowUp: 'ArrowUp',
   ArrowDown: 'ArrowDown',
   PageUp: 'PageUp',
   PageDown: 'PageDown',
   Home: 'Home',
   End: 'End',
   ESC: 'Escape',
} as const;

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
   className,
   DoubleLeftArrow,
   DoubleRightArrow,
   LeftArrow,
   RightArrow,
   ...props
}: {
   LeftArrow: any;
   RightArrow: any;
   DoubleLeftArrow: any;
   DoubleRightArrow: any;
   [key: string]: any;
} & React.ComponentPropsWithoutRef<'div'>) {
   const { LookDate, setLookDate, setSelectedDate } = React.useContext(
      CalendarContext
   );

   const setPreviousMonth = () => {
      const previousMonth = subMonths(LookDate, 1);
      setLookDate(previousMonth);
      setSelectedDate(previousMonth);
   };
   const setNextMonth = () => {
      const nextMonth = addMonths(LookDate, 1);
      setLookDate(nextMonth);
      setSelectedDate(nextMonth);
   };
   const setPreviousYear = () => {
      const previousYear = subYears(LookDate, 1);
      setLookDate(previousYear);
      setSelectedDate(previousYear);
   };
   const setNextYear = () => {
      const nextYear = addYears(LookDate, 1);
      setLookDate(nextYear);
      setSelectedDate(nextYear);
   };
   const handleKeyPress = (e: any, cb: any) => {
      const charCode = e.charCode;
      if (charCode === 13 || charCode === 32) {
         cb();
      }
   };

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
               <DoubleLeftArrow />
            </div>
            <div
               tabIndex={0}
               className="iconContainer"
               onClick={setPreviousMonth}
               onKeyPress={e => handleKeyPress(e, setPreviousMonth)}
               role="button"
               aria-label="Previous month"
            >
               <LeftArrow />
            </div>
         </div>
         <div
            className="month"
            role="heading"
            aria-label="Current Label"
            aria-level={1}
         >
            {LookDate && format(LookDate, 'MMMM yyyy')}
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
               <RightArrow />
            </div>
            <div
               className="iconContainer"
               tabIndex={0}
               onClick={setNextYear}
               onKeyPress={e => handleKeyPress(e, setNextYear)}
               role="button"
               aria-label="Next year"
            >
               <DoubleRightArrow />
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
   [key: string]: any;
} & React.ComponentPropsWithoutRef<'div'>) {
   const { LookDate, setLookDate, setSelectedDate } = React.useContext(
      CalendarContext
   );

   const setPreviousDay = () => {
      const previousDay = subDays(LookDate, 1);
      setLookDate(previousDay);
   };
   const setNextDay = () => {
      const nextDay = addDays(LookDate, 1);
      setLookDate(nextDay);
   };
   const setPreviousWeek = () => {
      const previousWeek = subWeeks(LookDate, 1);
      setLookDate(previousWeek);
   };
   const setNextWeek = () => {
      const nextWeek = addWeeks(LookDate, 1);
      setLookDate(nextWeek);
   };
   const setDatePreviousMonth = () => {
      setLookDate(subMonths(LookDate, 1));
   };
   const setDateNextMonth = () => {
      setLookDate(addMonths(LookDate, 1));
   };
   const setDatePreviousYear = () => {
      setLookDate(subYears(LookDate, 1));
   };
   const setDateNextYear = () => {
      setLookDate(addYears(LookDate, 1));
   };
   const setMonthStart = () => {
      setLookDate(startOfMonth(LookDate));
   };
   const setMonthEnd = () => {
      setLookDate(endOfMonth(LookDate));
   };

   const handleTableKeyPress = (e: React.KeyboardEvent<HTMLTableElement>) => {
      e.preventDefault();
      const keyCode = e.key;
      // Check if control key was pressed
      // const control = e.ctrlKey;
      // Use shift key to prevent browser shortcut conflicts
      const control = e.shiftKey;

      switch (keyCode) {
         case Keys.Enter:
            setSelectedDate(new Date(format(LookDate, 'yyyy-MM-dd')));
            return;
         case Keys.ESC:
            //  closeCalendar();
            return;
         case Keys.Space:
            setSelectedDate(new Date(format(LookDate, 'yyyy-MM-dd')));
            return;
         case Keys.PageUp:
            control ? setDatePreviousYear() : setDatePreviousMonth();
            return;
         case Keys.PageDown:
            control ? setDateNextYear() : setDateNextMonth();
            return;
         case Keys.End:
            setMonthEnd();
            return;
         case Keys.Home:
            setMonthStart();
            return;
         case Keys.ArrowLeft:
            setPreviousDay();
            return;
         case Keys.ArrowUp:
            setPreviousWeek();
            return;
         case Keys.ArrowRight:
            setNextDay();
            return;
         case Keys.ArrowDown:
            setNextWeek();
            return;
         default:
            return;
      }
   };

   return (
      <table
         id="grid"
         tabIndex={0}
         role="grid"
         onKeyDown={handleTableKeyPress}
         aria-label="calendar-body"
         className={cx('calendar-body', className)}
         {...props}
      >
         {children}
      </table>
   );
}

function CalendarWeeks({
   DaysFormate = DefaultDaysFormate,
   className,
   ...props
}: {
   DaysFormate?: typeof DefaultDaysFormate;
} & React.ComponentPropsWithoutRef<'thead'>) {
   return (
      <thead className={cx('Weeks', className)} {...props}>
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
   className,
   DaysStyles,
   CurrentDayStyles,
   ...props
}: {
   DaysStyles?: {};
   CurrentDayStyles?: {};
   [key: string]: any;
} & React.ComponentPropsWithoutRef<'tbody'>) {
   const {
      selectedDate,
      setSelectedDate,
      LookDate,
      setLookDate,
   } = React.useContext(CalendarContext);

   const onClickDay = (date: Date) => {
      setSelectedDate(date);
      setLookDate(date);
   };
   return (
      <tbody className={cx('calendar-days', className)} {...props}>
         {generateMonth(LookDate).map((week, index) => (
            <tr key={index} role="row" className="week">
               {week.map((day, index) =>
                  day ? (
                     day.toLocaleDateString() ===
                     selectedDate.toLocaleDateString() ? (
                        <td
                           key={index}
                           role="gridcell"
                           data-hover={day.getDate() === LookDate.getDate()}
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
                           data-hover={day.getDate() === LookDate.getDate()}
                           aria-label={day && format(day, 'dd MMMM yyyy')}
                           className="box day"
                           onClick={() => onClickDay(day)}
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
   className,
   CalendarIcon,
   ...props
}: {
   CalendarIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
} & React.ComponentPropsWithRef<'div'>) {
   const { setSelectedDate } = React.useContext(CalendarContext);
   return (
      <div className={cx('calendar-footer', className)} {...props}>
         <div className="footer-text">
            <div className="footer-text-container-title">
               <CalendarIcon />
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
   setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
   children?: React.ReactNode;
   className?: string;
};

export type CalenderContextType = Pick<
   CalendarProps,
   'selectedDate' | 'setSelectedDate'
> & {
   LookDate: Date;
   setLookDate: React.Dispatch<React.SetStateAction<Date>>;
};

export const CalendarContext = React.createContext({} as CalenderContextType);

const Calendar = ({
   selectedDate,
   setSelectedDate,
   children,
   className,
   ...props
}: CalendarProps & React.ComponentPropsWithoutRef<'div'>) => {
   const [LookDate, setLookDate] = React.useState<Date>(selectedDate);

   React.useEffect(() => {
      setLookDate(selectedDate);
   }, [selectedDate]);

   return (
      <CalendarContext.Provider
         value={{
            selectedDate,
            setSelectedDate,
            LookDate,
            setLookDate,
         }}
      >
         <div className={cx('calendar', className)} {...props}>
            {children}
         </div>
      </CalendarContext.Provider>
   );
};

export {
   Calendar,
   CalendarTitle,
   CalendarDays,
   CalendarFooter,
   CalendarWeeks,
   CalendarBody,
};
