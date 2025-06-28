import * as React from 'react';
import { clsx } from 'clsx';
import { useFormControl } from './Hooks/useFormControl';
import './FormControl.scss';

/**
 * Context type for form control components.
 *
 * Provides shared props and handlers for input-related components.
 */
type FormControlContextTypes = {
   /** The alert message to be displayed when validation fails or an error occurs. */
   alert: string;
   /** Indicates whether an alert message should be shown. */
   isAlert: boolean;
   /** Disables the form control and prevents user interaction. */
   disabled: boolean;
   /** Indicates whether the form control label has been checked or validated. */
   LabelCheck: boolean;
   /** Optional flag to indicate if an overlay (e.g. tooltip or modal) is active. */
   overlay?: boolean;
   /**
    * Handler for input value changes.
    * @param e - The change event from an input, textarea, or select element. */
   inputChange: (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => void;
   /**
    * Handler for input focus events.
    * @param e - The focus event from an input, textarea, or select element. */
   onFocus: (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => void;
};

export const FormControlContext = React.createContext(
   {} as FormControlContextTypes
);

export const useFormContext = () => {
   const context = React.useContext(FormControlContext);
   if (!context) {
      throw new Error(
         'useFormContext must be used within a <FormControlProvider>'
      );
   }
   return context;
};

/**
 * Props for the FormControl component.
 *
 * Wraps form inputs with contextual state such as validation, focus tracking, and disabled logic.
 *
 * @property overlay - Optional flag to indicate an overlay layout.
 * @property check - Enables validation checks using the `validate` function.
 * @property alertMessage - Initial alert message to show if there's an input error.
 * @property disabled - Disables input interaction within the form control.
 * @property required - Marks input as required. Defaults to `true`.
 * @property validate - Optional validation function. Returns a string error message if validation fails.
 * @property children - Form field elements (e.g., input, label) to be wrapped.
 */
export interface FormControlProps
   extends React.ComponentPropsWithoutRef<'div'> {
   /** Indicates if the form field is in an overlay layout. */
   overlay?: boolean;
   /** Enables validation behavior when input value changes. */
   check?: boolean;
   /** ariaLabelledby for "group" role. */
   ariaLabelledby?: string;
   /** Initial alert message to display for input validation errors. */
   alertMessage?: string;
   /** Disables all child input interactions. */
   disabled?: boolean;
   /** Marks the input as required. Defaults to `true`. */
   required?: boolean;
   /** Optional validation function returning an error message. */
   validate?: (value: string) => string;
   /** The form elements to be wrapped inside the control. */
   children?: React.ReactNode;
}

/**
 * FormControl component to wrap and manage the behavior of form elements.
 *
 * Provides validation, disabled state, and contextual input management to its children via React Context.
 * Use in conjunction with `useFormContext()` to access form state within nested input components.
 *
 * @returns A `<div>` element with form-related context and styling applied.
 *
 * @example
 * <FormControl alertMessage="Required field" validate={(v) => v ? '' : 'Required'}>
 *   <label htmlFor="name">Name</label>
 *   <input id="name" />
 * </FormControl>
 */
function FormControl({
   overlay,
   check,
   ariaLabelledby = 'field-label',
   required = true,
   alertMessage = '',
   disabled = false,
   className,
   validate,
   children,
   ...restProps
}: FormControlProps) {
   const formControlClass = clsx('form-control', className);

   const { labelCheck, alert, isAlert, inputChange, onFocus } = useFormControl({
      alertState: alertMessage,
      validate,
      required,
   });

   return (
      <FormControlContext.Provider
         value={{
            alert,
            isAlert,
            disabled,
            overlay,
            LabelCheck: labelCheck,
            inputChange,
            onFocus,
         }}
      >
         <div
            role="group"
            aria-labelledby={ariaLabelledby}
            className={formControlClass}
            {...restProps}
         >
            {children}
         </div>
      </FormControlContext.Provider>
   );
}
export default FormControl;
