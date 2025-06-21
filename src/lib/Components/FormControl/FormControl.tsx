import * as React from 'react';
import { clsx } from 'clsx';
import './FormControl.scss';
import { useFormControl } from './Hooks/useFormControl';

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
      React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => void;
   onFocus: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => void;
   LabelCheck: boolean;
   overlay?: boolean;
   alert: string;
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
            alert,
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
