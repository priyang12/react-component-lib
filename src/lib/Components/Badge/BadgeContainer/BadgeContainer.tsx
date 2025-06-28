import clsx from 'clsx';

export interface BadgeContainer extends React.ComponentPropsWithoutRef<'div'> {}

/**
 * `BadgeContainer` is a layout component used to wrap elements that include a `Badge`.
 *
 * Ensures correct positioning and styling for the badge relative to its target (e.g., icons, buttons).
 * Useful when applying badges dynamically to components that require contextual placement.
 *
 * @returns A styled `<div>` wrapper for containing a `Badge` and its associated content.
 *
 * @example
 * <BadgeContainer>
 *   <Icon />
 *   <Badge BadgeContent={3} />
 * </BadgeContainer>
 */
export default function BadgeContainer(props: BadgeContainer) {
   const { className, ...rest } = props;

   return (
      <div className={clsx('badge-container', className)} {...rest}>
         {props.children}
      </div>
   );
}
