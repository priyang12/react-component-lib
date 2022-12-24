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

/**
 * Button is a component that represents a button.
 *
 * @param text - The text to be displayed on the button.
 * @param ellipsis - If true, the text will be truncated with an ellipsis if it exceeds
 * the width of the button.
 * @param variant - The variant of the button. Can be 'primary' or 'secondary'.
 * @param radius - The border radius of the button.
 * @param children - The content of the button.
 * @param isLoading - If true, the button will be disabled and the text will be replaced with
 * the value of `LoadingText`.
 * @param LoadingText - The text to be displayed when the button is in a loading state.
 * @param className - A class name to be applied to the button element.
 * @param props - Additional props to be passed to the button element.
 *
 * @returns a button element.
 *
 * @example
 *
 * <Button variant="primary" text="Click me" />
 */

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
