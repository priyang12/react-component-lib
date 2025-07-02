import * as React from 'react';
import {
   addDays,
   addMonths,
   addWeeks,
   addYears,
   endOfMonth,
   format,
   startOfMonth,
   subDays,
   subMonths,
   subWeeks,
   subYears,
} from 'date-fns';
import { clsx } from 'clsx';
import { CalendarContext, Keys } from '../Calendar';

/**
 * Props for the CalendarBody component.
 *
 * @typedef {object} CalendarBodyProps
 * @property {string} [className] - Optional class names for styling the table.
 */
export interface CalendarBodyProps
   extends React.ComponentPropsWithoutRef<'table'> {
   /** Optional class name for the calendar body table */
   className?: string;
}

/**
 * CalendarBody handles keyboard navigation and renders the calendar's grid.
 *
 * @param {CalendarBodyProps} props - Props including children and className.
 *
 */
function CalendarBody({ children, className, ...props }: CalendarBodyProps) {
   const { LookDate, setLookDate, setSelectedDate } =
      React.useContext(CalendarContext);

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
         className={clsx('calendar-body', className)}
         {...props}
      >
         {children}
      </table>
   );
}

export default CalendarBody;
