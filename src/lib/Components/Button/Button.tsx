import * as React from 'react';
import { clsx } from 'clsx';
import { VariantType } from '../interface';
import { callAll } from '../../Utils/AllFunctionsCall';
import { useRipple } from '../../../Hooks';
import './Button.scss';

/**
 * Props for the Button component.
 *
 * Extends the native HTML button props and includes customization options for styles,
 * loading state, ripple effects, and text behavior.
 *
 * @property text - Optional text to display inside the button. Can be used in addition to or instead of children.
 * @property ellipsis - If `true`, applies ellipsis styling for overflowing text.
 * @property variant - Visual variant of the button, such as `'primary'`, `'secondary'`, etc.
 * @property ripple - Controls the ripple effect on click. Set `show` to `true` to enable, with optional custom `bgColor`.
 * @property isLoading - If `true`, the button is disabled and shows the loading state.
 * @property LoadingText - Text to show when `isLoading` is `true`. Defaults to `'Loading...'`.
 */
export interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
   /** Optional text content for the button. */
   text?: string;
   /** Enables ellipsis styling for overflowing text. */
   ellipsis?: boolean;
   /** Visual variant of the button (e.g., 'primary', 'danger'). */
   variant?: VariantType;
   /** Configuration for ripple effect on button click. */
   ripple?: {
      /** If true, enables the ripple effect. */
      show: boolean;
      /** Optional background color for the ripple. */
      bgColor?: string;
   };
   /** Shows a loading state and disables the button. */
   isLoading?: boolean;
   /** Custom loading text shown when `isLoading` is active. */
   LoadingText?: string;
   /** Icon component rendered inside the button */
   iconComponent?: React.ReactNode;
}

/**
 * Interactive button component with support for ripple effects and loading states.
 *
 * Useful for form actions, navigation, and interactive UI controls.
 * Supports custom text, children, and visual variants.
 *
 * @example
 * ```tsx
 * <Button text="Submit" variant="primary" isLoading={submitting} />
 * ```
 */

function Button({
   text,
   ellipsis,
   variant = 'primary',
   isLoading,
   LoadingText = 'Loading...',
   ripple,
   iconComponent,
   className,
   children,
   ...props
}: IButtonProps) {
   const { ref, createRipple } = useRipple(ripple);
   const classes = clsx(
      'Button',
      `Button-${variant}`,
      ellipsis && 'Button-ellipsis',
      iconComponent && 'Button-icon',
      className
   );

   const handleClick: React.ComponentPropsWithoutRef<'button'>['onClick'] = (
      e
   ) => {
      if (ripple?.show) createRipple(e);
   };

   const { onClick: propClick, ...restProps } = props;

   return (
      <button
         ref={ref}
         className={classes}
         disabled={isLoading}
         onClick={callAll(handleClick, propClick)}
         {...restProps}
      >
         {isLoading ? (
            LoadingText
         ) : (
            <>
               {iconComponent && <span>{iconComponent}</span>}
               {text}
               {children}
            </>
         )}
      </button>
   );
}
export default Button;
