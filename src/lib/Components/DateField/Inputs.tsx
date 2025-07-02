// BaseInput.tsx

import * as React from 'react';

export type BaseInputProps = {
   FieldInputStyles?: React.CSSProperties;
   inputRef: React.RefObject<HTMLInputElement>;

   // Accessibility & ARIA props
   ariaLabel: string;
   ariaValueMax: number;
   ariaValueMin: number;
   ariaValueNow: number;
   ariaValueText: string;

   // Value handling
   displayValue: string | number;
   placeholder: string;

   // Event handlers
   onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
   onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
};

/**
 * A generic, accessible spinbutton input for date fields.
 */
export function BaseInput({
   FieldInputStyles,
   inputRef,
   ariaLabel,
   ariaValueMax,
   ariaValueMin,
   ariaValueNow,
   ariaValueText,
   displayValue,
   placeholder,
   onKeyDown,
   onFocus,
}: BaseInputProps) {
   return (
      <input
         role="spinbutton"
         ref={inputRef}
         style={FieldInputStyles}
         tabIndex={0}
         aria-label={ariaLabel}
         aria-valuemax={ariaValueMax}
         aria-valuemin={ariaValueMin}
         aria-valuenow={ariaValueNow}
         aria-valuetext={ariaValueText}
         value={displayValue}
         placeholder={placeholder}
         onKeyDown={onKeyDown}
         onFocus={onFocus}
         onChange={() => {}}
      />
   );
}
