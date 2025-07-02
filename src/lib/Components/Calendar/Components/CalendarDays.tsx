import * as React from 'react';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { CalendarContext, generateMonth } from '../Calendar';

/**
 * Props for the CalendarDays component.
 *
 * @typedef {object} CalendarDaysProps
 * @property {string} [className] - Optional class name to style the tbody.
 * @property {React.CSSProperties} [DaysStyles] - Inline styles for all regular day cells.
 * @property {React.CSSProperties} [CurrentDayStyles] - Inline styles for the currently selected day.
 */
export type CalendarDaysProps = React.ComponentPropsWithoutRef<'tbody'> & {
   /** Optional class name for custom styling */
   className?: string;

   /** Optional inline style for regular days */
   DaysStyles?: React.CSSProperties;

   /** Optional inline style for the selected day */
   CurrentDayStyles?: React.CSSProperties;
};

/**
 * Renders the days of the month inside a calendar grid.
 * It maps the current visible month into a week-based structure and handles date selection.
 *
 * @param {CalendarDaysProps} props - Props for the CalendarDays component.
 *
 */
function CalendarDays({
   className,
   DaysStyles = {},
   CurrentDayStyles = {},
   ...props
}: CalendarDaysProps): JSX.Element {
   const { selectedDate, setSelectedDate, LookDate, setLookDate } =
      React.useContext(CalendarContext);

   const handleClick = (date: Date) => {
      setSelectedDate(date);
      setLookDate(date);
   };

   const isSameDate = (a: Date, b: Date) =>
      a.toDateString() === b.toDateString();

   const weeks = generateMonth(LookDate);

   return (
      <tbody className={clsx('calendar-days', className)} {...props}>
         {weeks.map((week, weekIndex) => (
            <tr key={weekIndex} role="row" className="calendar-days-week">
               {week.map((day, dayIndex) => {
                  const isSelected = !!day && isSameDate(day, selectedDate);
                  const isHovered = !!day && isSameDate(day, LookDate);

                  const commonProps = {
                     key: dayIndex,
                     role: 'gridcell',
                     'data-hover': isHovered || undefined,
                     'aria-label': day
                        ? format(day, 'dd MMMM yyyy')
                        : undefined,
                     className: clsx('box', {
                        day: !!day,
                        empty: !day,
                        selected: isSelected,
                     }),
                     style: isSelected ? CurrentDayStyles : DaysStyles,
                     onClick: day ? () => handleClick(day) : undefined,
                  };

                  return <td {...commonProps}>{day ? day.getDate() : ''}</td>;
               })}
            </tr>
         ))}
      </tbody>
   );
}

export default CalendarDays;
