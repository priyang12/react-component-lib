import * as React from 'react';
import { clsx } from 'clsx';
import { DefaultDaysFormate } from '../Calendar';

/**
 * A single day format used in the calendar header.
 */
export interface DayFormat {
   /** The short label displayed in the calendar header (e.g., "M", "T", "W") */
   name: string;
   /** The full name of the day (e.g., "Monday") used for accessibility */
   value: string;
}

/**
 * Props for the CalendarWeeks component.
 *
 * @typedef {object} CalendarWeeksProps
 * @property {DayFormat[]} [DaysFormate] - Array of day formats to display (defaults to `DefaultDaysFormate`)
 * @property {string} [className] - Optional class names for styling
 */
export interface CalendarWeeksProps
   extends React.ComponentPropsWithoutRef<'thead'> {
   /** Array of day format objects (label and full name) */
   DaysFormate?: DayFormat[];

   /** Optional additional class names */
   className?: string;
}

/**
 * CalendarWeeks renders the weekday headers in the calendar.
 *
 * @param {CalendarWeeksProps} props - Component props
 *
 */
function CalendarWeeks({
   DaysFormate = DefaultDaysFormate,
   className,
   ...props
}: CalendarWeeksProps): JSX.Element {
   return (
      <thead className={clsx('weeks', className)} {...props}>
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

export default CalendarWeeks;
