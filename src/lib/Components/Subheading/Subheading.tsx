import React from 'react';
import clsx from 'clsx';
import './Subheading.scss';

export interface SubheadingProps
   extends React.HTMLAttributes<HTMLParagraphElement> {
   /** Optional size override */
   size?: 'lg' | 'md' | 'sm';
   /** Optional HTML tag override */
   as?: React.ElementType;
}

/**
 * Subheading displays a smaller typographic element for secondary titles.
 * Defaults to a paragraph but can be rendered with any element via `as`.
 */
const Subheading = ({
   size = 'md',
   as: Component = 'p',
   className,
   children,
   ...props
}: SubheadingProps) => {
   return (
      <Component
         className={clsx('Subheading', `Subheading--${size}`, className)}
         {...props}
      >
         {children}
      </Component>
   );
};

export default Subheading;
