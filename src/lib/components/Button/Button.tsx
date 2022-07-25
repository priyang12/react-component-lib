import * as React from 'react';
import { cx } from '@chakra-ui/utils';
import { Variant } from '../interface';
import './Button.scss';

export interface IProps {
   text?: string;
   style?: any;
   as?: string;
   StyleClass?: any;
   ellipsis?: boolean;
   variant?: Variant['variant'];
   radius?: string;
   className?: any;
   children?: React.ReactNode;
}

function Button({
   text,
   as,
   style,
   StyleClass,
   ellipsis,
   variant = 'primary',
   radius,
   children,
   className,
   ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & IProps) {
   const btnClass = cx(
      'btn',
      ellipsis && 'ellipsis',
      StyleClass,
      variant,
      radius,
      className
   );

   return (
      <button
         className={btnClass}
         style={{
            ...style,
            borderRadius: radius,
         }}
         {...props}
      >
         {text ? text : children}
      </button>
   );
}

export default Button;
