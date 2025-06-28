import * as React from 'react';

/**
 * Props for the useFormControl hook.
 *
 * Controls validation and alert messaging logic for form inputs.
 *
 * @property alertState - Initial alert message to set when the component mounts.
 * @property validate - Optional validation function that returns an error message if the input is invalid.
 * @property required - Indicates whether the input is required. Defaults to standard required validation if no `validate` function is provided.
 */
type useFormControlProps = {
   /** Initial alert message shown on component mount. */
   alertState: string;
   /** Optional validation function that returns a string error message if invalid. */
   validate?: (value: string) => string;
   /** Whether the input is required. Used as a fallback when `validate` is not provided. */
   required?: boolean;
};

/**
 * Custom hook for managing input validation, focus behavior, and alert state.
 *
 * Useful for handling reusable form logic in components like `FormControl`.
 * Automatically updates alert messages and label state based on input change or focus.
 *
 * @returns An object containing:
 * - `labelCheck`: Whether the input has passed validation or has value.
 * - `alert`: Current validation or required field message.
 * - `isAlert`: Boolean indicating if an alert message is present.
 * - `inputChange`: Event handler for input changes.
 * - `onFocus`: Event handler for input focus.
 *
 * @example
 * const { labelCheck, alert, isAlert, inputChange, onFocus } = useFormControl({
 *   alertState: '',
 *   validate: (v) => v.length < 3 ? 'Too short' : '',
 *   required: true,
 * });
 */
export function useFormControl({
   alertState,
   validate,
   required,
}: useFormControlProps) {
   const [labelCheck, setLabelCheck] = React.useState(false);
   const [alert, setAlert] = React.useState(alertState);
   const isAlert = alert ? true : false;

   const inputChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => {
      const value = e.target.value;
      if (validate) {
         const message = validate(value);
         setAlert(message || '');
         setLabelCheck(!message);
      } else if (required) {
         setLabelCheck(value.length > 0);
         setAlert(value.length === 0 ? `value is required` : '');
      }
   };

   const onFocus = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => {
      if (validate) {
         const message = validate(e.target.value);
         setAlert(message || '');
         setLabelCheck(!message);
      }
   };

   return { labelCheck, alert, isAlert, inputChange, onFocus };
}
