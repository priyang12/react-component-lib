import * as React from 'react';
import { clsx } from 'clsx';
import './FormControl.scss';

export type FormControlProps = {
   overlay?: boolean;
   check?: boolean;
   className?: string;
   validate?: (value: string) => string;
   required?: boolean;
   children?: React.ReactNode;
};

type FormControlContextTypes = {
   inputChange: (
      e: //  add others later like select,checkbox
      | React.ChangeEvent<HTMLInputElement>
         | React.ChangeEvent<HTMLTextAreaElement>
   ) => void;
   onFocus: (
      e:
         | React.ChangeEvent<HTMLInputElement>
         | React.ChangeEvent<HTMLTextAreaElement>
   ) => void;
   LabelCheck: boolean;
   overlay?: boolean;
   Alert: string;
};

export const FormControlContext = React.createContext(
   {} as FormControlContextTypes
);

function useFormControl({
   validate,
   required,
}: {
   validate?: (value: string) => string;
   required?: boolean;
}) {
   const [labelCheck, setLabelCheck] = React.useState(false);
   const [alert, setAlert] = React.useState('');

   const inputChange = (
      e:
         | React.ChangeEvent<HTMLInputElement>
         | React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      const value = e.target.value;
      if (validate) {
         const message = validate(value);
         setAlert(message || '');
         setLabelCheck(!message);
      } else if (required) {
         setLabelCheck(value.length > 0);
         setAlert(value.length === 0 ? 'value is required' : '');
      }
   };

   const onFocus = (
      e:
         | React.ChangeEvent<HTMLInputElement>
         | React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      if (validate) {
         const message = validate(e.target.value);
         setAlert(message || '');
         setLabelCheck(!message);
      }
   };

   return { labelCheck, alert, inputChange, onFocus };
}

function FormControl({
   overlay,
   check,
   className,
   validate,
   required = true,
   children,
   ...restProps
}: FormControlProps) {
   const formControlClass = clsx('form-control', className);
   const { labelCheck, alert, inputChange, onFocus } = useFormControl({
      validate,
      required,
   });

   return (
      <FormControlContext.Provider
         value={{
            inputChange,
            onFocus,
            Alert: alert,
            overlay,
            LabelCheck: labelCheck,
         }}
      >
         <div className={formControlClass} {...restProps}>
            {children}
         </div>
      </FormControlContext.Provider>
   );
}
export default FormControl;
