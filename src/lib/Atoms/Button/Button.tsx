import * as React from 'react';
import { cx } from '@chakra-ui/utils';
import { Variant } from '../interface';
import './Button.scss';

export interface IButtonProps {
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
}: React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> &
   IButtonProps) {
   const WithIcon = React.Children.count('svg');

   const classes = cx(
      'Button',
      variant,
      StyleClass,
      radius,
      ellipsis && 'Button-ellipsis',
      WithIcon && 'Button-icon',
      className
   );

   return (
      <button className={classes} style={style} {...props}>
         {text}
         {children}
      </button>
   );
}
export default Button;
