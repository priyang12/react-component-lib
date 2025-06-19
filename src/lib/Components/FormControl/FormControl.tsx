import * as React from 'react';
import { clsx } from 'clsx';
import './FormControl.scss';

export type FormControl = {
   overlay?: boolean;
   check?: boolean;
   className?: string;
   validate?: (value: string) => string;
   required?: boolean;
   children?: React.ReactNode;
};

type FormControlContextTypes = {
   inputChange: (
      e:
         | React.ChangeEvent<HTMLInputElement>
         | React.ChangeEvent<HTMLTextAreaElement>
   ) => void;
   onFocus: () => void;
   LabelCheck: boolean;
   overlay?: boolean;
   Alert: string;
};

export const FormControlContext = React.createContext(
   {} as FormControlContextTypes
);

function FormControl({
   overlay,
   check,
   className,
   validate,
   required = true,
   children,
   ...restProps
}: FormControl) {
   const formControlClass = clsx('form-control', className);
   const [labelCheck, setLabelCheck] = React.useState(false);
   const [alert, setAlert] = React.useState('');

   const inputChange = (
      e:
         | React.ChangeEvent<HTMLInputElement>
         | React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      if (validate) {
         const message = validate(e.target.value);
         console.log(message);
         if (message) {
            setAlert(message);
            setLabelCheck(false);
         } else {
            setAlert('');
            setLabelCheck(true);
         }
      } else if (required) {
         if (e.target.value.length > 0) {
            setLabelCheck(true);
            setAlert('');
         } else {
            setLabelCheck(false);
            setAlert('value is required');
         }
      }
   };

   const onFocus = () => {
      setLabelCheck(true);
   };

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
