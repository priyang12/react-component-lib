import * as React from 'react';
import { useCounter } from '../../../Hooks/useCounter';
import { isLeapYear } from 'date-fns';
import { clsx } from 'clsx';
import { BaseInput } from './Inputs';
import { SeparateSignWrapper } from './SeparateSignWrapper';
import { KEYCODE, MaxDaysWithoutLeap } from './constants';
import './DateField.scss';

/**
 * Props for the BaseDateField component.
 */
export interface BaseDateFieldProps
   extends React.HTMLAttributes<HTMLDivElement> {
   /**
    * The currently selected date.
    */
   date: Date;

   /**
    * Function to update the selected date.
    */
   setDate: React.Dispatch<React.SetStateAction<Date>>;

   /**
    * The format of the displayed date parts (defaults to `'DD/MM/YYYY'`).
    * Must include all parts: `DD`, `MM`, `YYYY` in any order.
    */
   formattedDate?:
      | 'DD/MM/YYYY'
      | 'DD-MM-YYYY'
      | 'YYYY/DD/MM'
      | 'YYYY/MM/DD'
      | 'MM/YYYY/DD';

   /**
    * Character to separate date parts (e.g., `'/'`, `'-'`, `'.'`).
    * Default is `'/'`.
    */
   separateSign?: string;

   /**
    * Whether to visually show the separator sign between date parts.
    * Default is `true`.
    */
   ShouldSeparate?: boolean;

   /**
    * Whether to include a hidden input to store ISO date string for form submission.
    * Default is `false`.
    */
   hiddenInput?: boolean;

   /**
    * Additional props to be passed to the hidden input element, if `hiddenInput` is true.
    */
   hiddenInputProps?: React.InputHTMLAttributes<HTMLInputElement>;

   /**
    * Optional inline styles for the individual day/month/year input fields.
    */
   FieldInputStyles?: React.CSSProperties;

   /**
    * Additional class name for the outer container.
    */
   className?: string;

   /**
    * Children to render below the date inputs (e.g. messages, custom buttons).
    */
   children?: React.ReactNode;
}

function DateField({
   date,
   setDate,
   formattedDate = 'DD/MM/YYYY',
   separateSign = '/',
   ShouldSeparate = true,
   hiddenInput = false,
   hiddenInputProps,
   FieldInputStyles,
   className,
   children,
   ...props
}: BaseDateFieldProps) {
   const DaysRef = React.useRef<HTMLInputElement>(null);
   const MonthsRef = React.useRef<HTMLInputElement>(null);
   const YearsRef = React.useRef<HTMLInputElement>(null);

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
   const TargetsRefs = [] as React.RefObject<HTMLInputElement>[];
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

   React.useEffect(() => {
      setYear(date.getFullYear());
      setMonthCounter(date.getMonth() + 1);
      setDay(date.getDate());
   }, [date]);

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
      if (e.key === KEYCODE.BACKSPACE) {
         if (!Math.floor(dayCount / 10)) {
            setDay(date.getDate());
            setFocusElement({
               ...FocusElement,
               day: false,
            });
            DaysRef.current?.blur();
         } else {
            setDay(Math.floor(dayCount / 10));
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
         } else if (monthCount * 10 + Number(e.key) < 13) {
            setMonthCounter(monthCount * 10 + Number(e.key));
         } else {
            setMonthCounter(Number(e.key));
         }
      }
      if (e.key === KEYCODE.BACKSPACE) {
         if (!Math.floor(monthCount / 10)) {
            setMonthCounter(date.getMonth() + 1);
            setFocusElement({
               ...FocusElement,
               month: false,
            });
            MonthsRef.current?.blur();
         } else {
            setMonthCounter(Math.floor(monthCount / 10));
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
      if (e.key === KEYCODE.BACKSPACE) {
         if (!Math.floor(yearCount / 10)) {
            setYear(date.getFullYear());
            setFocusElement({
               ...FocusElement,
               year: false,
            });
            YearsRef.current?.blur();
         } else {
            setYear(Math.floor(yearCount / 10));
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
      <div
         className={clsx('DateField', className)}
         data-DatePicker--focus={
            FocusElement.day || FocusElement.month || FocusElement.year
         }
         {...props}
      >
         <div className="date">
            {TargetsRefs.map((TargetRef, index) => {
               switch (index) {
                  case DisplayFormate.day: {
                     return (
                        <SeparateSignWrapper
                           index={index}
                           ShouldSeparate={ShouldSeparate}
                           separateSign={separateSign}
                        >
                           <BaseInput
                              FieldInputStyles={FieldInputStyles}
                              inputRef={TargetRef}
                              ariaLabel="Day"
                              ariaValueMax={
                                 MaxDays[monthCount as keyof typeof MaxDays]
                              }
                              ariaValueMin={1}
                              ariaValueNow={dayCount}
                              ariaValueText={dayCount.toString()}
                              displayValue={FocusElement.day ? dayCount : 'DD'}
                              placeholder="DD"
                              onKeyDown={KeyPressed}
                              onFocus={Focus}
                           />
                        </SeparateSignWrapper>
                     );
                  }
                  case DisplayFormate.month: {
                     return (
                        <SeparateSignWrapper
                           index={index}
                           ShouldSeparate={ShouldSeparate}
                           separateSign={separateSign}
                        >
                           <BaseInput
                              FieldInputStyles={FieldInputStyles}
                              inputRef={TargetRef}
                              ariaLabel="Month"
                              ariaValueMax={12}
                              ariaValueMin={1}
                              ariaValueNow={monthCount}
                              ariaValueText={monthCount.toString()}
                              displayValue={
                                 FocusElement.month ? monthCount : 'MM'
                              }
                              placeholder="MM"
                              onKeyDown={KeyPressed}
                              onFocus={Focus}
                           />
                        </SeparateSignWrapper>
                     );
                  }
                  case DisplayFormate.year: {
                     return (
                        <SeparateSignWrapper
                           index={index}
                           ShouldSeparate={ShouldSeparate}
                           separateSign={separateSign}
                        >
                           <BaseInput
                              FieldInputStyles={FieldInputStyles}
                              inputRef={TargetRef}
                              ariaLabel="Year"
                              ariaValueMin={1}
                              ariaValueMax={9999}
                              ariaValueNow={yearCount}
                              ariaValueText={yearCount.toString()}
                              displayValue={
                                 FocusElement.year ? yearCount : 'YY'
                              }
                              placeholder="MM"
                              onKeyDown={KeyPressed}
                              onFocus={Focus}
                           />
                        </SeparateSignWrapper>
                     );
                  }
                  default: {
                     return null;
                  }
               }
            })}
         </div>
         {hiddenInput && (
            <input
               type="hidden"
               value={date.toISOString()}
               {...hiddenInputProps}
            />
         )}
         {children}
      </div>
   );
}

export default DateField;
