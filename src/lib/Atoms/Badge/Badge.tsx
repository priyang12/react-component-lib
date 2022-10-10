import React from 'react';
import { chakra, ChakraProps } from '@chakra-ui/system';
import { cx } from '@chakra-ui/utils';
import { Variant } from '../interface';
import './Badge.scss';

function BadgeContainer(
   props: ChakraProps & React.ComponentPropsWithoutRef<'div'>
) {
   const { className, ...rest } = props;
   return (
      <chakra.div className={cx('badge-container', className)} {...rest}>
         {props.children}
      </chakra.div>
   );
}
/**
 *
 *
 * @interface BadgeProps
 * @extends {ChakraProps}
 */
interface BadgeProps extends ChakraProps {
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
   const StyledBadge = chakra('span', {
      baseStyle: {
         display: 'inline-block',
         padding: '0.25em .50em',
         fontWeight: 'bold',
         lineHeight: '1',
         textAlign: 'center',
         whiteSpace: 'nowrap',
         verticalAlign: 'baseline',
         borderRadius: '50%',
      },
   });
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
         <StyledBadge
            className={cx(
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
         </StyledBadge>
      );
   }
   return (
      <StyledBadge
         className={cx(
            props.className,
            'badge',
            'badge-position',
            `badge-position-${anchorOriginVertical}-${anchorOriginHorizontal}`,
            variant
         )}
         {...props}
      >
         {badgeContentDisplay}
      </StyledBadge>
   );
}

export { Badge, BadgeContainer };
