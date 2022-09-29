import * as React from 'react';
import { isLeapYear } from 'date-fns';
import { useCounter } from '../../../Hooks/useCounter';
import './DateField.scss';

export interface DateFieldProps extends React.HTMLAttributes<HTMLDivElement> {
   label: string;
   id: string;
   formattedDate?: string;
}

const KEYCODE = {
   LEFT: 'ArrowLeft',
   RIGHT: 'ArrowRight',
   UP: 'ArrowUp',
   DOWN: 'ArrowDown',
} as const;

const MaxDaysWithoutLeap = {
   1: 31,
   2: 28,
   3: 31,
   4: 30,
   5: 31,
   6: 30,
   7: 31,
   8: 31,
   9: 30,
   10: 31,
   11: 30,
   12: 31,
};

function DateField({
   label,
   id,
   formattedDate = 'DD/MM/YYYY',
}: DateFieldProps) {
   const [date] = React.useState<Date>(new Date());
   const [MaxDays, setMaxDays] = React.useState(MaxDaysWithoutLeap);
   const DaysRef = React.useRef<HTMLDivElement>(null);
   const MonthsRef = React.useRef<HTMLDivElement>(null);
   const YearsRef = React.useRef<HTMLDivElement>(null);
   const {
      Count: yearCount,
      Increment: incrementYear,
      Decrement: decreaseYear,
      setCounter: setYear,
   } = useCounter(date.getFullYear(), {
      max: null,
      min: null,
   });

   const {
      Count: monthCount,
      setCounter: setMonthCounter,
      RoundIncrement: incrementMonth,
      RoundDecrement: decrementMonth,
   } = useCounter(date.getMonth() + 1, {
      max: 12,
      min: 1,
   });

   const {
      Count: dayCount,
      RoundIncrement: incrementDay,
      RoundDecrement: decrementDay,
      setCounter: setDay,
      setMaxCounter: setMaxDay,
   } = useCounter(date.getDate(), {
      max: MaxDays[monthCount as keyof typeof MaxDays],
      min: 1,
   });

   React.useEffect(() => {
      setMaxDay(MaxDays[monthCount as keyof typeof MaxDays]);
      if (dayCount > MaxDays[monthCount as keyof typeof MaxDays])
         setDay(MaxDays[monthCount as keyof typeof MaxDays]);
   }, [monthCount]);

   React.useEffect(() => {
      if (isLeapYear(new Date(yearCount, 1, 1))) {
         setMaxDay(29);
         setMaxDays({
            ...MaxDays,
            2: 29,
         });
      }
   }, [yearCount]);

   const KeyPressedDays = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === KEYCODE.UP) {
         incrementDay();
      } else if (e.key === KEYCODE.DOWN) {
         decrementDay();
      }
      if (Number(e.key)) {
         if (dayCount > 10) {
            setDay(Number(e.key));
         } else if (
            dayCount * 10 + Number(e.key) <
            MaxDays[monthCount as keyof typeof MaxDays]
         ) {
            setDay(dayCount * 10 + Number(e.key));
         } else {
            setDay(Number(e.key));
         }
      }
   };

   const KeyPressedMonths = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === KEYCODE.UP) {
         incrementMonth();
      } else if (e.key === KEYCODE.DOWN) {
         decrementMonth();
      }
      if (Number(e.key)) {
         if (monthCount > 10) {
            setMonthCounter(Number(e.key));
         } else if (monthCount * 10 + Number(e.key) < 12) {
            setMonthCounter(monthCount * 10 + Number(e.key));
         } else {
            setMonthCounter(Number(e.key));
         }
      }
   };

   const KeyPressedYear = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === KEYCODE.UP) {
         incrementYear();
      } else if (e.key === KEYCODE.DOWN) {
         decreaseYear();
      }
      if (Number(e.key)) {
         if (yearCount > 1000) {
            setYear(Number(e.key));
         } else if (yearCount * 10 + Number(e.key) < 9999) {
            setYear(yearCount * 10 + Number(e.key));
         }
      }
   };

   const KeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.currentTarget) {
         case DaysRef.current: {
            KeyPressedDays(e);
            if (e.key === KEYCODE.RIGHT) {
               MonthsRef.current?.focus();
            }
            if (e.key === KEYCODE.LEFT) {
               YearsRef.current?.focus();
            }
            break;
         }
         case MonthsRef.current: {
            KeyPressedMonths(e);

            if (e.key === KEYCODE.RIGHT) {
               YearsRef.current?.focus();
            }
            if (e.key === KEYCODE.LEFT) {
               DaysRef.current?.focus();
            }
            break;
         }

         case YearsRef.current: {
            KeyPressedYear(e);
            if (e.key === KEYCODE.LEFT) {
               MonthsRef.current?.focus();
            }
            if (e.key === KEYCODE.RIGHT) {
               DaysRef.current?.focus();
            }
         }
      }
   };

   return (
      <div>
         <label className="date-field__label" htmlFor={id}>
            {label}
         </label>
         <div className="date">
            <div
               ref={DaysRef}
               tabIndex={1}
               onKeyDown={KeyPressed}
               onClick={incrementDay}
            >
               {dayCount ? dayCount : formattedDate.split('/')[0]}
            </div>
            <div
               ref={MonthsRef}
               tabIndex={2}
               onKeyDown={KeyPressed}
               onClick={incrementMonth}
            >
               {monthCount ? monthCount : formattedDate.split('/')[1]}
            </div>
            <div
               ref={YearsRef}
               tabIndex={3}
               onKeyDown={KeyPressed}
               onClick={incrementYear}
            >
               {yearCount ? yearCount : formattedDate.split('/')[2]}
            </div>
         </div>
      </div>
   );
}

export default DateField;
