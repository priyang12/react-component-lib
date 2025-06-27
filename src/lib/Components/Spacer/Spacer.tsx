import * as React from 'react';
import clsx from 'clsx';
import './Spacer.scss';

/**
 * Props for the Spacer component.
 *
 * Extends standard HTML div attributes for flexibility.
 *
 * @property size - Defines the amount of spacing. Options are `'xs'`, `'sm'`, `'md'`, `'lg'`, or `'xl'`. Defaults to `'md'`.
 * @property direction - Controls the direction of spacing. Can be `'horizontal'` or `'vertical'`. Defaults to `'vertical'`.
 */
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
   /** Defines the amount of spacing. */
   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

   /** Controls the direction of spacing. */
   direction?: 'horizontal' | 'vertical';
}

/**
 * Flexible spacing utility component.
 *
 * Renders an empty div to provide consistent spacing between elements.
 * Useful for layout structure and white space management in UI design.
 */
function Spacer({
   size = 'md',
   direction = 'vertical',
   className,
   ...props
}: SpacerProps) {
   const spacerClass = clsx(
      'spacer',
      `spacer--${direction}`,
      `spacer--${size}`,
      className
   );

   return (
      <div
         aria-hidden="true"
         role="presentation"
         tabIndex={-1}
         className={spacerClass}
         {...props}
      />
   );
}

export default Spacer;
