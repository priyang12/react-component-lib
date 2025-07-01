import React from 'react';
import clsx from 'clsx';
import './Heading.scss';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
   /** Heading level (semantic tag): h1 through h6 */
   as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
   /** Visual style (optional): overrides styling independent of semantic level */
   size?: 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
}

/**
 * Heading renders semantic HTML headings (h1–h6) with consistent visual styles.
 * If `size` is not provided, it defaults to a value based on the heading level.
 * @example
 * ```tsx
 * <Heading as="h1">Main Title</Heading>      // display
 * <Heading as="h4">Section</Heading>        // md
 * <Heading as="h3" size="sm">Smaller</Heading> // sm (overridden)
 * ```
 */
const Heading = ({
   as: Component = 'h1',
   size,
   className,
   children,
   ...props
}: HeadingProps) => {
   // Map heading tag to default visual size
   const defaultSizeMap: Record<HeadingProps['as'], HeadingProps['size']> = {
      h1: 'display',
      h2: 'xl',
      h3: 'lg',
      h4: 'md',
      h5: 'sm',
      h6: 'xs',
   };
   const finalSize = size ?? defaultSizeMap[Component];

   return (
      <Component
         className={clsx('Heading', `Heading--${finalSize}`, className)}
         {...props}
      >
         {children}
      </Component>
   );
};

export default Heading;
