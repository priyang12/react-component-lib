import clsx from 'clsx';

/**
 * BadgeContainer is a component that represents a container for a badge.
 *
 * @param props - Additional props to be passed to the div element.
 *
 * @returns a div element that acts as a container for a badge.
 *
 * @example
 *
 * <BadgeContainer>
 *   <Badge BadgeContent={3} />
 * </BadgeContainer>
 */
export default function BadgeContainer(
   props: React.ComponentPropsWithoutRef<'div'>
) {
   const { className, ...rest } = props;

   return (
      <div className={clsx('badge-container', className)} {...rest}>
         {props.children}
      </div>
   );
}
