import * as React from 'react';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { CalendarContext } from '../Calendar';

/**
 * Props for the CalendarFooter component.
 *
 * @typedef {object} CalendarFooterProps
 * @property {React.ComponentType<React.SVGProps<SVGSVGElement>>} CalendarIcon - Icon displayed next to the "Today" label.
 * @property {string} [className] - Optional additional class names.
 */
export interface CalendarFooterProps
   extends React.ComponentPropsWithRef<'div'> {
   /** Icon displayed next to the "Today" label */
   CalendarIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;

   /** Optional additional class names for the footer container */
   className?: string;
}

/**
 * Renders the calendar footer with the current date and a reset/clear button.
 *
 * @param {CalendarFooterProps} props - Props for CalendarFooter
 *
 */
function CalendarFooter({
   className,
   CalendarIcon,
   ...props
}: CalendarFooterProps): JSX.Element {
   const { setSelectedDate } = React.useContext(CalendarContext);

   const handleClear = () => {
      setSelectedDate(new Date());
   };

   return (
      <div className={clsx('calendar-footer', className)} {...props}>
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
            <button className="clear-btn" onClick={handleClear}>
               Clear
            </button>
         </div>
      </div>
   );
}

export default CalendarFooter;
