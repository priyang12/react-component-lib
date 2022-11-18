import React from 'react';
import { clsx } from 'clsx';
import { Variant } from '../interface';
import './Badge.scss';

function BadgeContainer(props: React.ComponentPropsWithoutRef<'div'>) {
   const { className, ...rest } = props;

   return (
      <div className={clsx('badge-container', className)} {...rest}>
         {props.children}
      </div>
   );
}
/**
 *
 *
 * @interface BadgeProps
 *
 */
interface BadgeProps {
   variant?: Variant['variant'];
   BadgeContent: string | number;
   colorScheme?: string;
   anchorOriginVertical: 'bottom' | 'top';
   anchorOriginHorizontal: 'right' | 'left';
   showOnHover?: boolean; // show badge on hover
   Max?: number; // max number of badge to show if badgeContent is an string then string length will be used as max
}

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
