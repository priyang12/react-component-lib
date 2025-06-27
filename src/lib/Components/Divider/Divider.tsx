import * as React from 'react';
import clsx from 'clsx';
import './Divider.scss';

/**
 * Props for the Divider component.
 *
 * Extends standard HTML div props and allows additional customization.
 *
 * @property align - Controls the orientation of the divider. Options are `'horizontal'` or `'vertical'`. Defaults to `'horizontal'`.
 */
export interface DividerProps extends React.ComponentPropsWithoutRef<'div'> {
   /** Controls the orientation of the divider. */
   align?: 'vertical' | 'horizontal';
}

/**
 * Visually separates content using a customizable divider.
 *
 * Renders a horizontal or vertical line, optionally with inline text.
 * Supports accessibility using `role="separator"` and ARIA orientation attributes.
 * Automatically adjusts styling when children are provided.
 */
const Divider: React.FC<DividerProps> = ({
   align = 'horizontal',
   children,
   className,
   ...props
}) => {
   const hasContent = Boolean(children);

   return (
      <div
         className={clsx(
            'divider',
            `divider--${align}`,
            { 'divider--with-text': hasContent },
            className
         )}
         role="separator"
         aria-orientation={align}
         {...props}
      >
         {hasContent && <span className="divider-text">{children}</span>}
      </div>
   );
};

export default Divider;
