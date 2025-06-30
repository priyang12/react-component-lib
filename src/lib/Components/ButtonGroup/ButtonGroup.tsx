import * as React from 'react';
import { Button } from '../Button';
import { clsx } from 'clsx';
import type { VariantType } from '../interface';
import './ButtonGroup.scss';

/**
 * Props for the ButtonGroup component.
 *
 * Groups multiple Button components together and optionally applies a shared variant.
 *
 * @property variant - Optional visual variant to apply to all direct Button children (e.g., `'primary'`, `'secondary'`, etc.).
 * @property className - Optional additional class names to apply to the ButtonGroup container.
 * @property children - One or more React elements, typically Button components.
 */
export interface IButtonGroupProps
   extends React.ComponentPropsWithoutRef<'div'> {
   /** Shared visual variant for all child buttons, if not overridden individually. */
   variant?: VariantType;
   /** Additional class names for the ButtonGroup container. */
   className?: string;
   /** Buttons or other elements to be grouped together. */
   children: React.ReactNode;
}

/**
 * A layout component that groups multiple buttons together.
 *
 * Useful for organizing related actions side by side, such as form controls or segmented buttons.
 * Automatically passes the `variant` prop to direct child Button components unless they override it.
 *
 * @returns A wrapper `<div>` with role="group" containing the given children.
 *
 * @example
 * ```tsx
 * <ButtonGroup variant="secondary">
 *   <Button text="One" />
 *   <Button text="Two" />
 * </ButtonGroup>
 * ```
 */
function ButtonGroup({
   variant,
   className,
   children,
   ...props
}: IButtonGroupProps) {
   const ButtonGroupClass = clsx('ButtonGroup', className);

   // pass props to Button.tsx
   const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Button) {
         const childProps = child.props as { variant?: VariantType };
         const mergedVariant = childProps.variant ?? variant;
         return React.cloneElement(
            child as React.ReactElement<{ variant?: VariantType }>,
            { variant: mergedVariant }
         );
      }
      return child;
   });

   return (
      <div className={ButtonGroupClass} role="group" {...props}>
         {enhancedChildren}
      </div>
   );
}

export default ButtonGroup;
