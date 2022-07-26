import * as React from 'react';
import { cx } from '@chakra-ui/utils';
import './Input.scss';

export interface InputProps {
   InputSize: 'small' | 'medium' | 'large';
   alert?: boolean | string;
   className?: string;
}

function Input({
   InputSize = 'medium',
   alert,
   className,
   ...props
}: React.InputHTMLAttributes<HTMLInputElement> & InputProps) {
   const InputClass = cx('input', InputSize, alert && 'alert', className);

   return <input className={InputClass} {...props} />;
}

export default Input;
