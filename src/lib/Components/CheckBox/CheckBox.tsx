import * as React from 'react';
import clsx from 'clsx';
import { useToggle } from '../../../Hooks';
import { useFormContext } from '../FormControl';
import { callAll } from '../../Utils/AllFunctionsCall';
import './CheckBox.scss';

/**
 * Props for the CheckBox component.
 *
 * Extends standard HTML `<input type="checkbox">` props and includes
 * support for size-based styling and form context integration.
 *
 * @property boxSize - Defines the visual size of the checkbox. Options are `'small'`, `'medium'`, or `'large'`.
 */
export interface CheckBoxProps extends React.ComponentPropsWithoutRef<'input'> {
   /** Defines the visual size of the checkbox. */
   boxSize?: 'small' | 'medium' | 'large';
}

/**
 * A reusable checkbox component that supports both controlled and uncontrolled behavior.
 * It also integrates with the `FormControl` context to support validation, error states,
 * and form-level change tracking.
 *
 * @example
 * // Controlled usage
 * <CheckBox checked={isChecked} onChange={(e) => setChecked(e.target.checked)} />
 *
 * @example
 * // Uncontrolled usage
 * <CheckBox defaultChecked />
 *
 */
function CheckBox({
   checked,
   boxSize = 'medium',
   className,
   ...props
}: CheckBoxProps) {
   const { value: checkValue, toggleValue: toggleCheck } = useToggle(checked);
   const { isAlert, inputChange } = useFormContext();

   const HandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         toggleCheck();

         // Manually fire synthetic change for FormControl context
         const syntheticEvent = {
            target: { value: String(!checkValue) },
         } as React.ChangeEvent<HTMLInputElement>;

         if (inputChange) inputChange(syntheticEvent);
      }
   };

   const HandleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
      toggleCheck();
   };

   const { onKeyDown, onClick, onChange, ...resetProps } = props;

   return (
      <input
         className={clsx(`checkbox checkbox-${boxSize}`, className, {
            'checkbox-alert': isAlert,
         })}
         type="checkbox"
         tabIndex={0}
         onKeyDown={callAll(onKeyDown, HandleKeyDown)}
         onClick={callAll(onClick, HandleOnClick)}
         onChange={callAll(onChange, inputChange)}
         value={String(checkValue)}
         checked={checkValue}
         {...resetProps}
      />
   );
}

export default CheckBox;
