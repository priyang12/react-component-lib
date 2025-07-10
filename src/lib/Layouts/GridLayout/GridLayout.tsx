import * as React from 'react';
import clsx from 'clsx';
import './GridLayout.scss';

/**
 * Props for the GridLayout component.
 *
 * Extends native HTML element props and defines grid layout configuration for children.
 * Supports custom grid column count, gaps, and named template areas.
 *
 * @property as - The HTML tag or custom React component to render as the grid container. Defaults to `'div'`.
 * @property gridNumber - Number of columns in the grid. Used in `grid-template-columns`. Defaults to `16`.
 * @property gap - CSS gap between grid items. Accepts any valid CSS size (e.g., `'1rem'`, `'8px'`).
 * @property templateAreas - Optional array of strings to define named grid areas. Each string represents a row.
 *                            When provided, sets the `grid-template-areas` CSS property.
 */
export interface GridLayoutProps
   extends React.ComponentPropsWithoutRef<React.ElementType> {
   /** The element type to render (e.g., `'section'`, `'div'`, or a custom component). */
   as?: React.ElementType;

   /** Number of grid columns (used in `grid-template-columns`). Defaults to 16. */
   gridNumber?: number;

   /** Gap between grid items (used in the `gap` property). */
   gap?: string;

   /** Defines named grid areas using an array of row definitions (e.g., `["header header", "sidebar content"]`). */
   templateAreas?: string[];
}

/**
 * A flexible CSS Grid layout component that allows consumers to define a grid with
 * dynamic column count, spacing (`gap`), and named template areas.
 *
 * Typically used as a wrapper around `GridItem` components for building responsive, 12/16-column layout systems.
 *
 * @example
 * ```tsx
 * <GridLayout gridNumber={12} gap="16px" templateAreas={[
 *   '"header header header header"',
 *   '"sidebar content content content"'
 * ]}>
 *   <GridItem area="header">Header</GridItem>
 *   <GridItem area="sidebar">Sidebar</GridItem>
 *   <GridItem area="content">Main Content</GridItem>
 * </GridLayout>
 * ```
 */

function GridLayout({
   as: Component = 'div',
   gridNumber = 16,
   gap = '',
   templateAreas,
   className,
   style,
   children,
   ...props
}: GridLayoutProps) {
   return (
      <Component
         className={clsx('GridLayout', className)}
         style={Object.assign(
            {
               '--grid-layout-number': gridNumber,
               '--grid-gap': gap,
               '--grid-template-areas': templateAreas?.join(' '),
            },
            style
         )}
         {...props}
      >
         {children}
      </Component>
   );
}

export default GridLayout;
