import * as React from 'react';
import { clsx } from 'clsx';
import './FormControl.scss';

export type FormControl = {
   overlay?: boolean;
   check?: boolean;
   className?: string;
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
   children,
   className,
   ...restProps
}: FormControl) {
   const FormControlClass = clsx('form-control', className);
   const [LabelCheck, setLabelCheck] = React.useState(false);
   const [Alert, setAlert] = React.useState('');

   const inputChange = (
      e:
         | React.ChangeEvent<HTMLInputElement>
         | React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      if (e.target.value.length > 0) {
         setLabelCheck(true);
         setAlert('');
      } else {
         setLabelCheck(false);
         setAlert('value is required');
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
            Alert,
            overlay,
            LabelCheck,
         }}
      >
         <div className={FormControlClass} {...restProps}>
            {children}
         </div>
      </FormControlContext.Provider>
   );
}
export default FormControl;
