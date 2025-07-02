import {
   endOfMonth,
   getDay,
   getDaysInMonth,
   setDate,
   startOfMonth,
} from 'date-fns';
import chunk from 'lodash.chunk';
import * as React from 'react';
import { clsx } from 'clsx';
import CalendarTitle from './Components/CalendarTitle';
import CalendarDays from './Components/CalendarDays';
import CalendarFooter from './Components/CalendarFooter';
import CalendarWeeks from './Components/CalendarWeeks';
import CalendarBody from './Components/CalendarBody';
import './Calendar.scss';

export const DefaultDaysFormate = [
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

export const Keys = {
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

export const generateMonth = (selectedDate: Date) => {
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

export type CalenderContextType = Pick<
   CalendarProps,
   'selectedDate' | 'setSelectedDate'
> & {
   LookDate: Date;
   setLookDate: React.Dispatch<React.SetStateAction<Date>>;
};

export const CalendarContext = React.createContext({} as CalenderContextType);

export interface CalendarProps extends React.ComponentPropsWithoutRef<'div'> {
   selectedDate: Date;
   setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
   children?: React.ReactNode;
   className?: string;
}

const CalendarContainer = ({
   selectedDate,
   setSelectedDate,
   children,
   className,
   ...props
}: CalendarProps) => {
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
         <div className={clsx('calendar', className)} {...props}>
            {children}
         </div>
      </CalendarContext.Provider>
   );
};

export default {
   Container: CalendarContainer,
   Title: CalendarTitle,
   Days: CalendarDays,
   Footer: CalendarFooter,
   Weeks: CalendarWeeks,
   Body: CalendarBody,
};
