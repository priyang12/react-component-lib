import * as React from 'react';
import { addMonths, addYears, format, subMonths, subYears } from 'date-fns';
import { clsx } from 'clsx';
import { CalendarContext } from '../Calendar';

/**
 * Props for the CalendarTitle component.
 *
 * @typedef {object} CalendarTitleProps
 * @property {React.ElementType} LeftArrow - Icon component for the previous month.
 * @property {React.ElementType} RightArrow - Icon component for the next month.
 * @property {React.ElementType} DoubleLeftArrow - Icon component for the previous year.
 * @property {React.ElementType} DoubleRightArrow - Icon component for the next year.
 * @property {string} [className] - Optional additional class names.
 */
export interface CalendarTitleProps
   extends React.ComponentPropsWithoutRef<'div'> {
   /** Icon for going to the previous month */
   LeftArrow: React.ElementType;

   /** Icon for going to the next month */
   RightArrow: React.ElementType;

   /** Icon for going to the previous year */
   DoubleLeftArrow: React.ElementType;

   /** Icon for going to the next year */
   DoubleRightArrow: React.ElementType;

   /** Optional additional class names */
   className?: string;
}

/**
 * Renders the calendar title with month/year and navigation controls.
 *
 * @param {CalendarTitleProps} props - Props for CalendarTitle component
 *
 */
function CalendarTitle({
   className,
   DoubleLeftArrow,
   DoubleRightArrow,
   LeftArrow,
   RightArrow,
   ...props
}: CalendarTitleProps) {
   const { LookDate, setLookDate, setSelectedDate } =
      React.useContext(CalendarContext);

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
      <div className={clsx('calendar-title', className)} {...props}>
         <div className="icons">
            <div
               className="iconContainer"
               tabIndex={0}
               onClick={setPreviousYear}
               onKeyPress={(e) => handleKeyPress(e, setPreviousYear)}
               role="button"
               aria-label="Previous year"
            >
               <DoubleLeftArrow />
            </div>
            <div
               tabIndex={0}
               className="iconContainer"
               onClick={setPreviousMonth}
               onKeyPress={(e) => handleKeyPress(e, setPreviousMonth)}
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
               onKeyPress={(e) => handleKeyPress(e, setNextMonth)}
               role="button"
               aria-label="Next year"
            >
               <RightArrow />
            </div>
            <div
               className="iconContainer"
               tabIndex={0}
               onClick={setNextYear}
               onKeyPress={(e) => handleKeyPress(e, setNextYear)}
               role="button"
               aria-label="Next year"
            >
               <DoubleRightArrow />
            </div>
         </div>
      </div>
   );
}

export default CalendarTitle;
