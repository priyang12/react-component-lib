import React from 'react';
import clsx from 'clsx';
import './Blockquote.scss';

export interface BlockquoteProps
   extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
   /** Optional citation or source for the quote */
   cite?: string;
   /** Render with different element if needed (e.g., div) */
   as?: React.ElementType;
}

/**
 * Blockquote displays quoted or highlighted text with optional citation.
 * Semantically uses <blockquote> but can be rendered with any element.
 * @example
 * ```tsx
  <Blockquote cite="– Albert Einstein">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, nulla!.
      <cite>– John dow</cite>
  </Blockquote>
   ```
 */
const Blockquote = ({
   cite,
   as: Component = 'blockquote',
   className,
   children,
   ...props
}: BlockquoteProps) => {
   return (
      <Component
         className={clsx('Blockquote', className)}
         cite={cite}
         {...props}
      >
         {children}
         {cite && <cite>{cite}</cite>}
      </Component>
   );
};

export default Blockquote;
