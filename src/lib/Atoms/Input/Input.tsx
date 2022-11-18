import * as React from 'react';
import { clsx } from 'clsx';
import { callAll } from '../../Utils/AllFunctionsCall';
import { FormControlContext } from '../../Module/FormControl/FormControl';
import './Input.scss';

export interface InputProps {
   InputSize: 'small' | 'medium' | 'large';
   alert?: boolean | string;
   className?: string;
}

function Input({
   InputSize = 'medium',
   className,
   ...props
}: React.ComponentPropsWithoutRef<'input'> & InputProps) {
   const { Alert, onFocus, inputChange } = React.useContext(FormControlContext);
   const InputClass = clsx('input', InputSize, Alert && 'alert', className);

   return (
      <input
         className={InputClass}
         onChange={callAll(props.onChange, inputChange)}
         onFocus={callAll(props.onFocus, onFocus)}
         {...props}
      />
   );
}

export default Input;
