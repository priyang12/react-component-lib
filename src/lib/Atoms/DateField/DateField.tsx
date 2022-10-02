import * as React from 'react';
import { isLeapYear } from 'date-fns';
import { useCounter } from '../../../Hooks/useCounter';
import './DateField.scss';

// Still need to work on aligning positions

export interface BaseDateFieldProps
   extends React.HTMLAttributes<HTMLDivElement> {
   label: string;
   id: string;
   formattedDate?: 'DD/MM/YYYY' | 'DD-MM-YYYY' | 'YYYY/DD/MM' | 'YYYY/MM/DD';
   date: Date;
   separateSign?: string;
   setDate: React.Dispatch<React.SetStateAction<Date>>;
}
export interface DateFieldWithInputProps extends BaseDateFieldProps {
   hiddenInput?: boolean;
   inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
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
   separateSign = '/',
   date,
   setDate,
   hiddenInput = false,
   inputProps,
}: DateFieldWithInputProps) {
   const DaysRef = React.useRef<HTMLDivElement>(null);
   const MonthsRef = React.useRef<HTMLDivElement>(null);
   const YearsRef = React.useRef<HTMLDivElement>(null);

   const Position = formattedDate.split(separateSign);
   const [DisplayFormate] = React.useState({
      day: Position.indexOf('DD' || 'dd'),
      month: Position.indexOf('MM' || 'mm'),
      year: Position.indexOf('YYYY' || 'yyyy'),
   });

   const [FocusElement, setFocusElement] = React.useState({
      day: false,
      month: false,
      year: false,
   });
   const [MaxDays, setMaxDays] = React.useState(MaxDaysWithoutLeap);

   // this will set switch between day month and year
   const TargetsRefs = [] as React.RefObject<HTMLDivElement>[];
   TargetsRefs[DisplayFormate.day] = DaysRef;
   TargetsRefs[DisplayFormate.month] = MonthsRef;
   TargetsRefs[DisplayFormate.year] = YearsRef;

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
      } else {
         setMaxDay(28);
         setMaxDays({
            ...MaxDays,
            2: 28,
         });
         if (dayCount > 28) setDay(28);
      }
   }, [yearCount]);

   React.useEffect(() => {
      setDate(new Date(yearCount, monthCount - 1, dayCount));
   }, [yearCount, monthCount, dayCount]);

   const KeyPressedDays = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === KEYCODE.UP) {
         incrementDay();
      } else if (e.key === KEYCODE.DOWN) {
         decrementDay();
      }
      if (Number(e.key) || e.key === '0') {
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
      if (Number(e.key) || e.key === '0') {
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
      if (Number(e.key) || e.key === '0') {
         if (yearCount > 1000) {
            setYear(Number(e.key));
         } else if (yearCount * 10 + Number(e.key) < 9999) {
            setYear(yearCount * 10 + Number(e.key));
         }
      }
   };

   const ChangeFocus = (Direction: string, Position: number) => {
      if (Direction === KEYCODE.LEFT) {
         const NextPosition = Position - 1 < 0 ? 2 : Position - 1;
         TargetsRefs[NextPosition].current?.focus();
      } else if (Direction === KEYCODE.RIGHT) {
         const NextPosition =
            TargetsRefs.length === Position + 1 ? 0 : Position + 1;

         TargetsRefs[NextPosition].current?.focus();
      }
   };

   const KeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.currentTarget) {
         case DaysRef.current: {
            if (e.key === 'Escape') {
               DaysRef.current?.blur();
            }
            KeyPressedDays(e);
            ChangeFocus(e.key, DisplayFormate.day);
            break;
         }
         case MonthsRef.current: {
            if (e.key === 'Escape') {
               MonthsRef.current?.blur();
            }
            KeyPressedMonths(e);
            ChangeFocus(e.key, DisplayFormate.month);
            break;
         }

         case YearsRef.current: {
            if (e.key === 'Escape') {
               YearsRef.current?.blur();
            }
            KeyPressedYear(e);
            ChangeFocus(e.key, DisplayFormate.year);
         }
      }
   };

   const Focus = (e: React.FocusEvent<HTMLInputElement>) => {
      switch (e.currentTarget) {
         case DaysRef.current: {
            setFocusElement({
               ...FocusElement,
               day: true,
            });
            break;
         }
         case MonthsRef.current: {
            setFocusElement({
               ...FocusElement,
               month: true,
            });
            break;
         }
         case YearsRef.current: {
            setFocusElement({
               ...FocusElement,
               year: true,
            });
            break;
         }
      }
   };

   return (
      <div>
         <label className="date-input" htmlFor={id}>
            {label}
         </label>
         <div className="date">
            <div
               role="spinbutton"
               aria-valuemax={MaxDays[monthCount as keyof typeof MaxDays]}
               aria-valuemin={0}
               aria-valuenow={dayCount}
               aria-valuetext={dayCount.toString()}
               aria-label="Day"
               ref={DaysRef}
               tabIndex={0}
               onKeyDown={KeyPressed}
               onFocus={Focus}
               style={{
                  order: DisplayFormate.day + 1,
               }}
            >
               {FocusElement.day ? dayCount : 'DD'}
            </div>

            {/* <span>{separateSign}</span> */}

            <div
               role="spinbutton"
               aria-valuemax={12}
               aria-valuemin={1}
               aria-valuenow={monthCount}
               aria-valuetext={monthCount.toString()}
               aria-label="Month"
               ref={MonthsRef}
               tabIndex={0}
               onKeyDown={KeyPressed}
               onFocus={Focus}
               style={{
                  order: DisplayFormate.month + 1,
               }}
            >
               {FocusElement.month ? monthCount : 'MM'}
            </div>

            {/* <span>{separateSign}</span> */}
            <div
               role="spinbutton"
               aria-valuemax={9999}
               aria-valuemin={1}
               aria-valuenow={yearCount}
               aria-valuetext={yearCount.toString()}
               aria-label="Year"
               ref={YearsRef}
               tabIndex={0}
               onKeyDown={KeyPressed}
               onFocus={Focus}
               style={{
                  order: DisplayFormate.year,
               }}
            >
               {FocusElement.year ? yearCount : 'YYYY'}
            </div>
         </div>
         {hiddenInput && (
            <input type="hidden" value={date.toISOString()} {...inputProps} />
         )}
      </div>
   );
}

export default DateField;
