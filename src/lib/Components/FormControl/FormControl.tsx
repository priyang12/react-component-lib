import * as React from 'react';
import { clsx } from 'clsx';
import './FormControl.scss';
import { useFormControl } from './Hooks/useFormControl';

type FormControlContextTypes = {
   alert: string;
   isAlert: boolean;
   disabled: boolean;
   LabelCheck: boolean;
   overlay?: boolean;
   inputChange: (
      e: //  add others later like select,checkbox using // React.SyntheticEvent
      React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => void;
   onFocus: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

export interface FormControlProps
   extends React.ComponentPropsWithoutRef<'div'> {
   overlay?: boolean;
   check?: boolean;
   alertMessage?: string;
   disabled?: boolean;
   required?: boolean;
   className?: string;
   validate?: (value: string) => string;
   children?: React.ReactNode;
}

// need to add aria-describedby with helper
function FormControl({
   overlay,
   check,
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
         <div className={formControlClass} {...restProps}>
            {children}
         </div>
      </FormControlContext.Provider>
   );
}
export default FormControl;
