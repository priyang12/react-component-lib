import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import './PinInput.scss';

/**
 * Props for the PinInput component.
 */
export interface PinInputProps
   extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
   /** Number of PIN input fields to render. */
   length?: number;
   /** Called whenever the input value changes. Returns the current value of the PIN. */
   onChange?: (value: string) => void;
   /** Called when all inputs are filled. Useful for triggering submission or validation logic. */
   onComplete?: (value: string) => void;
   /** Custom class name applied to each input field.  */
   inputClassName?: string;
   /** Disables all the input fields. */
   disabled?: boolean;
   /** Autofocus the first input field on mount. */
   autoFocus?: boolean;
}

function PinInput({
   length = 6,
   onChange,
   onComplete,
   className,
   inputClassName,
   disabled = false,
   autoFocus = false,
}: PinInputProps) {
   const [values, setValues] = useState<string[]>(Array(length).fill(''));
   const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

   const handleChange = (val: string, index: number) => {
      // number regex
      if (!/^[0-9]?$/.test(val)) return;

      const newValues = [...values];
      newValues[index] = val;
      setValues(newValues);
      onChange?.(newValues.join(''));

      if (val && index < length - 1) {
         inputRefs.current[index + 1]?.focus();
      }

      if (newValues.every((v) => v !== '')) {
         onComplete?.(newValues.join(''));
      }
   };

   const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
   ) => {
      if (e.key === 'Backspace') {
         if (values[index]) {
            handleChange('', index);
         } else if (index > 0) {
            inputRefs.current[index - 1]?.focus();
         }
      } else if (e.key === 'ArrowLeft') {
         if (index > 0) inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight') {
         if (index < length - 1) inputRefs.current[index + 1]?.focus();
      }
   };

   return (
      <div className={clsx('PinInput', className)}>
         {Array.from({ length }).map((_, i) => (
            <input
               key={i}
               ref={(el) => (inputRefs.current[i] = el)}
               className={clsx('pin-input', inputClassName)}
               type="text"
               inputMode="numeric"
               maxLength={1}
               disabled={disabled}
               value={values[i]}
               onChange={(e) => handleChange(e.target.value, i)}
               onKeyDown={(e) => handleKeyDown(e, i)}
               autoFocus={autoFocus && i === 0}
               aria-label={`Digit ${i + 1}`}
            />
         ))}
      </div>
   );
}

export default PinInput;
