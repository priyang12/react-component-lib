import * as React from 'react';
import { clsx } from 'clsx';
import { VariantType } from '../interface';
import { callAll } from '../../Utils/AllFunctionsCall';
import { useRipple } from '../../../Hooks';
import './Button.scss';

export interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
   text?: string;
   ellipsis?: boolean;
   variant?: VariantType;
   ripple?: {
      show: boolean;
      bgColor?: string;
   };
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
 * @param ripple - make a pulse animation on click.
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
   isLoading,
   LoadingText = 'Loading...',
   ripple,
   className,
   children,
   ...props
}: IButtonProps) {
   const WithIcon = React.Children.count('svg');
   const { ref, createRipple } = useRipple(ripple);
   const classes = clsx(
      'Button',
      `Button-${variant}`,
      ellipsis && 'Button-ellipsis',
      WithIcon && 'Button-icon',
      className
   );

   const handleClick: React.ComponentPropsWithoutRef<'button'>['onClick'] = (
      e
   ) => {
      createRipple(e);
   };

   return (
      <button
         ref={ref}
         className={classes}
         disabled={isLoading}
         style={{
            borderRadius: radius,
         }}
         onClick={callAll(handleClick, props.onClick)}
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
