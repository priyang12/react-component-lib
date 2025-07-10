import clsx from 'clsx';

export interface GridGridItemProps
   extends React.ComponentPropsWithoutRef<'div'> {
   as?: React.ElementType;
   area?: string;
   column?: string;
   row?: string;
   span?: number | { mobile: number; tablet: number; desktop: number };
}

export function GridItem({
   as: Component = 'div',
   area,
   column,
   row,
   span,
   className,
   children,
   style,
   ...props
}: GridGridItemProps) {
   // Convert `span` into `gridColumn` only if `column` not provided
   let computedColumn: string | undefined = column;

   if (!column && typeof span === 'number') {
      computedColumn = `span ${span}`;
   }
   const responsiveStyles: any = Object.assign({}, style);

   if (typeof span === 'object') {
      if (span?.mobile) {
         responsiveStyles['--grid-item-span-mobile'] = span.mobile;
      }
      if (span?.tablet) {
         responsiveStyles['--grid-item-span-tablet'] = span.tablet;
      }
      if (span?.desktop) {
         responsiveStyles['--grid-item-span-desktop'] = span.desktop;
      }
   }

   console.log(area);

   return (
      <Component
         style={Object.assign(
            area
               ? {
                    '--item-area': area,
                 }
               : { '--grid-Column': column, '--grid-Row': row },
            responsiveStyles
         )}
         className={clsx('GridItem', className)}
         {...props}
      >
         {children}
      </Component>
   );
}
