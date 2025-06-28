import React from 'react';
import { optionType } from './hooks/useSelect';

/**
 * Props for the `NativeSelect` component.
 *
 * Used internally to render a visually-hidden native `<select>` element to ensure form compatibility and accessibility.
 *
 * @property currentValue - The currently selected value. Used to set the default selection in the native `<select>`.
 * @property options - The list of options to render. Each option must be an object with `label` and `value` keys.
 */
interface NativeSelect extends React.ComponentPropsWithoutRef<'select'> {
   /** The currently selected option value. */
   currentValue: string;
   /** List of options to display in the native `<select>` element. */
   options: optionType[];
}

/**
 * Visually hidden native `<select>` element for form submission and accessibility.
 *
 * This component ensures that a custom select remains accessible to screen readers
 * and is included in native form submissions.
 *
 * @returns A native `<select>` element with mapped `<option>` children.
 * @example
 * <NativeSelect currentValue="js" options={[{ label: 'JavaScript', value: 'js' }]} />
 */

const NativeSelect = ({ currentValue, options, ...props }: NativeSelect) => {
   return (
      <select
         defaultValue={currentValue}
         aria-hidden="false"
         tabIndex={-1}
         className="visually-hidden"
         {...props}
      >
         {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
               {opt.label}
            </option>
         ))}
      </select>
   );
};

export default NativeSelect;
