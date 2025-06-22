import * as React from 'react';

type useFormControlProps = {
   alertState: string;
   validate?: (value: string) => string;
   required?: boolean;
};

export function useFormControl({
   alertState,
   validate,
   required,
}: useFormControlProps) {
   const [labelCheck, setLabelCheck] = React.useState(false);
   const [alert, setAlert] = React.useState(alertState);
   const isAlert = alert ? true : false;

   const inputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      if (validate) {
         const message = validate(e.target.value);
         setAlert(message || '');
         setLabelCheck(!message);
      }
   };

   return { labelCheck, alert, isAlert, inputChange, onFocus };
}
