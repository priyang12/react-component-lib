import * as React from 'react';
import './VisuallyHidden.scss';
import clsx from 'clsx';
import { Slot } from '../../Wrappers/Util/AsChildSlot';

/**
 * Props for the VisuallyHidden component.
 *
 * Extends standard HTML `div` props and provides additional options for focus ability and slot rendering.
 *
 * @property isFocusable - If `true`, the element will be focusable and respond to keyboard events like Enter, Space, and Escape.
 * @property asChild - If `true`, renders the children using a Slot wrapper instead of a `div` (useful for polymorphic components).
 */
export interface VisuallyHiddenProps
   extends React.ComponentPropsWithoutRef<'div'> {
   /** Whether the element should be focusable and respond to keyboard events. */
   isFocusable?: boolean;
   /** Renders the component as a Slot instead of a div, passing props to the child. */
   asChild?: boolean;
}

/**
 * Hides content visually while keeping it accessible to screen readers.
 *
 * Optionally makes the hidden content keyboard-focusable, useful for skip links and other accessibility use cases.
 * If `isFocusable` is true, the element becomes visible on focus and supports `Enter`, `Space`, and `Escape` key handling.
 *
 * If `asChild` is true, the component renders its children using a Slot wrapper instead of a `div`, allowing props to pass through.
 *
 * @example
 * ```tsx
 * <VisuallyHidden>Screen reader only text</VisuallyHidden>
 * ```
 * @example
 * ```tsx
 * <VisuallyHidden isFocusable>Skip to main content</VisuallyHidden>
 * ```
 */
function VisuallyHidden({
   isFocusable = false,
   asChild,
   className,
   children,
   ...props
}: VisuallyHiddenProps) {
   const RenderEl = asChild ? Slot : 'div';
   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const key = e.key;
      if (key === 'Enter' || key === ' ') {
         e.preventDefault();
         (e.currentTarget as HTMLElement).click();
      }
      if (key === 'Escape') {
         (e.currentTarget as HTMLElement).blur();
      }
   };
   return (
      <RenderEl
         className={clsx('visuallyHidden', className)}
         tabIndex={isFocusable ? 0 : -1}
         onKeyDown={isFocusable ? handleKeyDown : undefined}
         {...props}
      >
         {children}
      </RenderEl>
   );
}

export default VisuallyHidden;
