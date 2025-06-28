import * as React from 'react';
import { useFormContext } from '../FormControl/FormControl';
import { clsx } from 'clsx';
import './Label.scss';

/**
 * Props for the Label component.
 *
 * @property hidden - If `true`, hides the label visually while keeping it accessible to screen readers.
 * @property size - Defines the size of the label text. Options are `'small'`, `'medium'`, or `'large'`.
 */
export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
   /** Hides the label visually while keeping it accessible to screen readers. */
   hidden?: boolean;
   /** Adjusts the size of the label text. */
   size?: 'small' | 'medium' | 'large';
}

/**
 * Label component for form fields, integrated with `FormControl` context.
 *
 * Automatically updates appearance based on validation state, overlay mode, and user interaction.
 * Displays an alert message when validation fails, and supports accessibility via visually hidden text.
 *
 * @returns A styled `<label>` element that adapts to form validation and focus state.
 *
 * @example
 * ```tsx
 * <FormControl validate={(value) => !value && 'Required'}>
 *   <Label htmlFor="username" size="medium">Username</Label>
 *   <Input id="username" InputSize="medium" />
 * </FormControl>
 * ```
 */
function Label(props: LabelProps) {
   const { hidden, size, className, children, ...restProps } = props;
   const { alert, LabelCheck, overlay } = useFormContext();

   const labelClass = clsx(
      'label',
      LabelCheck && 'active',
      overlay && 'overlay',
      hidden ? 'visually-hidden' : 'show',
      size && `label--${size}`,
      className
   );

   return (
      <label className={labelClass} data-valid={LabelCheck} {...restProps}>
         {alert ? (
            <span className="label-alert" role="alert" aria-live="assertive">
               {alert}
            </span>
         ) : (
            children
         )}
      </label>
   );
}
export default Label;
