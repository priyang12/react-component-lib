import React from 'react';
import clsx from 'clsx';
import './Truncate.scss';

export interface TruncateProps extends React.HTMLAttributes<HTMLElement> {
   /** Show full text in native tooltip */
   showTooltip?: boolean;
   /** HTML tag to render as (e.g., span, div, p) */
   as?: React.ElementType;
   /** Number of lines to truncate after */
   lines?: number;
}

/**
 * Truncate limits text to a fixed number of lines using CSS line-clamp.
 * Uses a CSS variable to control line count.
 * @example
 * ```tsx
 *   <Truncate lines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget nisl at
 *    odio feugiat laoreet. Sed ac elit at nunc bibendum suscipit. Cras volutpat
 *    purus ut arcu laoreet.
 *   </Truncate>
 * ```
 */

const Truncate = ({
   children,
   showTooltip = true,
   as: Component = 'span',
   lines = 1,
   className,
   style,
   ...props
}: TruncateProps) => {
   const text = typeof children === 'string' ? children : undefined;

   return (
      <Component
         className={clsx('Truncate', className)}
         style={
            {
               '--truncate-lines': lines.toString(),
               ...style,
            } as React.CSSProperties
         }
         title={showTooltip && text ? text : undefined}
         {...props}
      >
         {children}
      </Component>
   );
};

export default Truncate;
