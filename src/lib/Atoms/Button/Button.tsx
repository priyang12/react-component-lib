import * as React from 'react';
import { clsx } from 'clsx';
import { VariantType } from '../interface';
import { callAll } from '../../Utils/AllFunctionsCall';
import './Button.scss';

export interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
   text?: string;
   ellipsis?: boolean;
   variant?: VariantType;
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
   const [ripple, setRipple] = React.useState<{
      x: number;
      y: number;
      show: boolean;
   }>();

   const classes = clsx(
      'Button',
      variant,
      ellipsis && 'Button-ellipsis',
      WithIcon && 'Button-icon',
      className
   );

   const handleClick: React.ComponentPropsWithoutRef<'button'>['onClick'] = (
      e
   ) => {
      const buttonCoords = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - buttonCoords.left;
      const y = e.clientY - buttonCoords.top;

      setRipple({
         x,
         y,
         show: true,
      });

      setTimeout(() => {
         setRipple({
            x: 0,
            y: 0,
            show: false,
         });
      }, 500);
   };

   return (
      <button
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
         {ripple?.show && (
            <div
               className="ripple"
               style={{
                  top: ripple.y,
                  left: ripple.x,
                  width: '50px',
                  height: '50px',
               }}
            />
         )}
      </button>
   );
}
export default Button;
