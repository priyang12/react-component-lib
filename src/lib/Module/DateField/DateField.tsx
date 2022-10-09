import * as React from 'react';
import Label from '../../Atoms/Label/Label';
import { isLeapYear } from 'date-fns';
import { cx } from '@chakra-ui/utils';
import { useCounter } from '../../../Hooks/useCounter';
import './DateField.scss';

export interface BaseDateInputProps {
   KeyPressed: (e: React.KeyboardEvent<HTMLInputElement>) => void;
   Focus: (e: React.FocusEvent<HTMLInputElement>) => void;
   FieldInputStyles?: React.CSSProperties;
   FocusElement: {
      day: boolean;
      month: boolean;
      year: boolean;
   };
}

function DayInput({
   dayCount,
   FieldInputStyles,
   DaysRef,
   FocusElement,
   MaxDays,
   monthCount,
   KeyPressed,
   Focus,
}: BaseDateInputProps & {
   dayCount: number;
   DaysRef: React.RefObject<HTMLInputElement>;
   monthCount: number;
   MaxDays: typeof MaxDaysWithoutLeap;
}) {
   return (
      <input
         role={'spinbutton'}
         style={FieldInputStyles}
         aria-valuemax={MaxDays[monthCount as keyof typeof MaxDays]}
         aria-valuemin={0}
         aria-valuenow={dayCount}
         aria-valuetext={dayCount.toString()}
         aria-label="Day"
         ref={DaysRef}
         tabIndex={0}
         onKeyDown={KeyPressed}
         onChange={() => {}}
         onFocus={Focus}
         value={FocusElement.day ? dayCount : 'DD'}
         placeholder="DD"
      />
   );
}

function MouthInput({
   monthCount,
   MonthsRef,
   FieldInputStyles,
   FocusElement,
   KeyPressed,
   Focus,
}: {
   monthCount: number;
   MonthsRef: React.RefObject<HTMLInputElement>;
} & BaseDateInputProps) {
   return (
      <input
         role="spinbutton"
         style={FieldInputStyles}
         aria-valuemax={12}
         aria-valuemin={1}
         aria-valuenow={monthCount}
         aria-valuetext={monthCount.toString()}
         aria-label="Month"
         ref={MonthsRef}
         tabIndex={0}
         onKeyDown={KeyPressed}
         onFocus={Focus}
         onChange={() => {}}
         value={FocusElement.month ? monthCount : 'MM'}
         placeholder="MM"
      />
   );
}

function YearInput({
   yearCount,
   YearsRef,
   FieldInputStyles,
   KeyPressed,
   Focus,
   FocusElement,
}: {
   yearCount: number;
   YearsRef: React.RefObject<HTMLInputElement>;
} & BaseDateInputProps) {
   return (
      <input
         role="spinbutton"
         style={FieldInputStyles}
         aria-valuemax={9999}
         aria-valuemin={1}
         aria-valuenow={yearCount}
         aria-valuetext={yearCount.toString()}
         aria-label="Year"
         ref={YearsRef}
         tabIndex={0}
         onKeyDown={KeyPressed}
         onFocus={Focus}
         value={FocusElement.year ? yearCount : 'YYYY'}
         onChange={() => {}}
      />
   );
}

function SeparateSignWrapper({
   separateSign,
   ShouldSeparate,
   children,
   index,
}: {
   index: number;
   separateSign: string;
   ShouldSeparate: boolean;
   children: React.ReactNode;
}) {
   if (ShouldSeparate && index === 1) {
      return (
         <>
            <span className="separate-sign">{separateSign}</span>
            {children}
            <span className="separate-sign">{separateSign}</span>
         </>
      );
   } else {
      return <>{children}</>;
   }
}

const KEYCODE = {
   LEFT: 'ArrowLeft',
   RIGHT: 'ArrowRight',
   UP: 'ArrowUp',
   DOWN: 'ArrowDown',
   BACKSPACE: 'Backspace',
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

export interface BaseDateFieldProps
   extends React.ComponentPropsWithoutRef<'div'> {
   label: string;
   id: string;
   formattedDate?:
      | 'DD/MM/YYYY'
      | 'DD-MM-YYYY'
      | 'YYYY/DD/MM'
      | 'YYYY/MM/DD'
      | 'MM/YYYY/DD';
   date: Date;
   separateSign?: string;
   ShouldSeparate: boolean;
   setDate: React.Dispatch<React.SetStateAction<Date>>;
   hiddenInput?: boolean;
   inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
   FieldInputStyles?: React.CSSProperties;
}

function DateField({
   label,
   id,
   formattedDate = 'DD/MM/YYYY',
   separateSign = '/',
   ShouldSeparate = true,
   date,
   setDate,
   hiddenInput = false,
   inputProps,
   FieldInputStyles,
   className,
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
         className={cx('DatePicker', {
            'DatePicker--focus':
               FocusElement.day || FocusElement.month || FocusElement.year,
            className,
         })}
         {...props}
      >
         <Label className="label" htmlFor={id}>
            {label}
         </Label>
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
                           <DayInput
                              FieldInputStyles={FieldInputStyles}
                              dayCount={dayCount}
                              DaysRef={TargetRef}
                              MaxDays={MaxDays}
                              FocusElement={FocusElement}
                              monthCount={monthCount}
                              KeyPressed={KeyPressed}
                              Focus={Focus}
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
                           <MouthInput
                              FieldInputStyles={FieldInputStyles}
                              monthCount={monthCount}
                              MonthsRef={TargetRef}
                              KeyPressed={KeyPressed}
                              FocusElement={FocusElement}
                              Focus={Focus}
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
                           <YearInput
                              FieldInputStyles={FieldInputStyles}
                              yearCount={yearCount}
                              YearsRef={TargetRef}
                              KeyPressed={KeyPressed}
                              FocusElement={FocusElement}
                              Focus={Focus}
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
            <input type="hidden" value={date.toISOString()} {...inputProps} />
         )}
      </div>
   );
}

export default DateField;
