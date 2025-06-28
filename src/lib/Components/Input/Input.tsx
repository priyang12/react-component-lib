import * as React from 'react';
import { clsx } from 'clsx';
import { callAll } from '../../Utils/AllFunctionsCall';
import { useFormContext } from '../FormControl/FormControl';
import './Input.scss';

/**
 * Props for the Input component.
 *
 * Extends standard HTML input props and includes additional styling and form context support.
 *
 * @property InputSize - Defines the visual size of the input. Options are `'small'`, `'medium'`, or `'large'`.
 * @property alert - If `true` or a string, applies alert styling (e.g., for validation errors).
 * @property className - Optional additional class names for the input element.
 */
export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
   /** Visual size of the input component. */
   InputSize: 'small' | 'medium' | 'large';
   /** Applies alert styling if true or a string message is provided. */
   alert?: boolean | string;
   /** Additional class names for styling the input. */
   className?: string;
}

/**
 * Input component with built-in styling and form context integration.
 *
 * Automatically integrates with `FormControl` via `useFormContext` to handle validation and state.
 * Supports size variants and conditional alert styling.
 *
 * @returns A customized `<input>` element suitable for form usage.
 *
 * @example
 * <FormControl validate={(v) => v.length < 3 ? 'Too short' : ''}>
 *   <Input InputSize="medium" placeholder="Your name" />
 * </FormControl>
 */
function Input({ InputSize = 'medium', className, ...props }: InputProps) {
   const { alert, onFocus: formFocus, inputChange } = useFormContext();
   const InputClass = clsx(
      'input',
      `input-${InputSize}`,
      alert && 'alert',
      className
   );

   const { onChange, onFocus, ...restProps } = props;
   return (
      <input
         className={InputClass}
         onChange={callAll(onChange, inputChange)}
         onFocus={callAll(onFocus, formFocus)}
         {...restProps}
      />
   );
}

export default Input;
