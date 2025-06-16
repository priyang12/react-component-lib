import React from 'react';
import { clsx } from 'clsx';
import { VariantType } from '../interface';
import './Badge.scss';

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
function BadgeContainer(props: React.ComponentPropsWithoutRef<'div'>) {
   const { className, ...rest } = props;

   return (
      <div className={clsx('badge-container', className)} {...rest}>
         {props.children}
      </div>
   );
}

export interface BadgeProps {
   variant?: VariantType;
   BadgeContent: string | number;
   colorScheme?: string;
   anchorOriginVertical: 'bottom' | 'top';
   anchorOriginHorizontal: 'right' | 'left';
   showOnHover?: boolean;
   Max?: number;
}
/**
 * Badge is a component that represents a badge.
 *
 * @param BadgeContent - The content of the badge. Can be a string or a number.
 * @param variant - The variant of the badge. Can be 'primary' or 'secondary'.
 * @param anchorOriginVertical - The vertical position of the badge relative to its container.
 * Can be 'top' or 'bottom'.
 * @param anchorOriginHorizontal - The horizontal position of the badge relative to its container.
 * Can be 'left' or 'right'.
 * @param Max - The maximum number of characters to display in the badge. If the content
 * exceeds this number, the badge will display `${Max}+`.
 * @param showOnHover - If true, the badge will only be displayed when the mouse is over
 * its container.
 * @param children - The content of the badge container.
 * @param props - Additional props to be passed to the span element.
 *
 * @returns a span element that represents a badge.
 *
 * @example
 *
 * <Badge BadgeContent={3} variant="primary" />
 */
function Badge({
   BadgeContent,
   variant,
   anchorOriginVertical = 'top',
   anchorOriginHorizontal = 'right',
   Max,
   showOnHover,
   children,
   ...props
}: BadgeProps & React.ComponentPropsWithoutRef<'div'>) {
   const [Hover, setHover] = React.useState(false);

   const badgeContentDisplay = Max
      ? typeof BadgeContent === 'string'
         ? BadgeContent.length > Max
            ? `${Max}+`
            : BadgeContent
         : BadgeContent > Max
         ? `${Max}+`
         : BadgeContent
      : BadgeContent;

   if (showOnHover) {
      return (
         <span
            className={clsx(
               props.className,
               'badge',
               'badge-position',
               `badge-position-${anchorOriginVertical}-${anchorOriginHorizontal}`,
               variant
            )}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...props}
         >
            {Hover ? BadgeContent : badgeContentDisplay}
         </span>
      );
   }

   return (
      <span
         className={clsx(
            props.className,
            'badge',
            'badge-position',
            `badge-position-${anchorOriginVertical}-${anchorOriginHorizontal}`,
            variant
         )}
         {...props}
      >
         {badgeContentDisplay}
      </span>
   );
}

export { Badge, BadgeContainer };
