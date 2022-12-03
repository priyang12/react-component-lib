import * as React from 'react';
import { clsx } from 'clsx';
import { Variant } from '../interface';
import './Button.scss';

export interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
   text?: string;
   ellipsis?: boolean;
   variant?: Variant['variant'];
   radius?: string;
   isLoading?: boolean;
   LoadingText?: string;
}

function Button({
   text,
   ellipsis,
   variant = 'primary',
   radius,
   children,
   isLoading,
   LoadingText = 'Loading...',
   className,
   ...props
}: IButtonProps) {
   const WithIcon = React.Children.count('svg');
   const classes = clsx(
      'Button',
      variant,
      ellipsis && 'Button-ellipsis',
      WithIcon && 'Button-icon',
      className
   );

   return (
      <button
         className={classes}
         disabled={isLoading}
         style={{
            borderRadius: radius,
         }}
         {...props}
      >
         {isLoading ? (
            LoadingText
         ) : (
            <>
               {text}
               {children}
            </>
         )}
      </button>
   );
}
export default Button;
