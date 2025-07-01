import React from 'react';
import clsx from 'clsx';
import './Paragraph.scss';

/**
 * Lead is a Paragraph variant used for introductory or summary text.
 * It uses larger font size and relaxed line height.
 */
export const Lead = ({
   as: Component = 'span',
   className,
   children,
   ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
   as?: React.ElementType;
}) => {
   return (
      <Component className={clsx('Paragraph--lead', className)} {...props}>
         {children}
      </Component>
   );
};

export interface ParagraphProps
   extends React.HTMLAttributes<HTMLParagraphElement> {
   /** Size variant for text */
   size?: 'lg' | 'md' | 'sm';
   /** Semantic color tone */
   tone?: 'default' | 'muted' | 'success' | 'warning' | 'error' | 'info';
   /** Optional HTML element override (e.g., span, div) */
   as?: React.ElementType;
}

/**
 * Paragraph renders body text with consistent typography styles.
 * Supports size variants and HTML tag overrides.
 * @example
 * <Paragraph tone="muted">This text is muted.</Paragraph>
 * <Paragraph tone="error">An error occurred.</Paragraph>
 * <Paragraph tone="success">Changes saved successfully.</Paragraph>
 */
const Paragraph = ({
   size = 'md',
   tone = 'default',
   as: Component = 'p',
   className,
   children,
   ...props
}: ParagraphProps) => {
   return (
      <Component
         className={clsx(
            'Paragraph',
            `Paragraph--${size}`,
            `Paragraph--${tone}`,
            className
         )}
         {...props}
      >
         {children}
      </Component>
   );
};

export default Paragraph;
