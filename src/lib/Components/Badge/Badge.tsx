import React from 'react';
import { clsx } from 'clsx';
import { VariantType } from '../interface';
import './Badge.scss';

function getBadgeDisplay(
   content: string | number,
   max?: number
): string | number {
   if (!max) return content;
   const value = typeof content === 'string' ? content.length : content;
   return value > max ? `${max}+` : content;
}

/**
 * Props for the Badge component.
 *
 * Provides configuration options for positioning, content, and display behavior of a badge.
 *
 * @property variant - Defines the badge style variant. Typically used for semantic styling such as `'primary'`, `'success'`, `'danger'`, etc.
 * @property BadgeContent - The content to be displayed inside the badge. Can be a string or number.
 * @property colorScheme - Optional CSS color scheme or className to apply custom colors.
 * @property anchorOriginVertical - Vertical position of the badge relative to its container. Either `'top'` or `'bottom'`.
 * @property anchorOriginHorizontal - Horizontal position of the badge relative to its container. Either `'left'` or `'right'`.
 * @property showOnHover - If `true`, the badge content is only visible when hovered.
 * @property Max - Optional maximum value before the badge content is abbreviated (e.g., `99+`).
 */
export interface BadgeProps {
   /** Defines the badge style variant for visual appearance. */
   variant?: VariantType;
   /** The content displayed inside the badge. */
   BadgeContent: string | number;
   /** Optional color scheme or custom class for the badge. */
   colorScheme?: string;
   /** Vertical position of the badge relative to its container. */
   anchorOriginVertical: 'bottom' | 'top';
   /** Horizontal position of the badge relative to its container. */
   anchorOriginHorizontal: 'right' | 'left';
   /** If true, the badge appears only on hover. */
   showOnHover?: boolean;
   /** Max value before truncating (e.g., shows `99+`). */
   Max?: number;
}

/**
 * Badge component for displaying notification counts or status indicators.
 *
 * Can be positioned relative to a container and optionally truncated at a max value.
 * Useful for indicating new messages, alerts, or item counts.
 * @example
 * ```tsx
 * <Badge BadgeContent={3} variant="primary" />
 * ```
 */
function Badge({
   BadgeContent,
   variant = 'primary',
   anchorOriginVertical = 'top',
   anchorOriginHorizontal = 'right',
   Max,
   showOnHover,
   children,
   ...props
}: BadgeProps & React.ComponentPropsWithoutRef<'div'>) {
   const [hover, setHover] = React.useState(false);
   const badgeContentDisplay = getBadgeDisplay(BadgeContent, Max);

   return (
      <span
         className={clsx(
            props.className,
            'badge',
            'badge-position',
            `badge-position-${anchorOriginVertical}-${anchorOriginHorizontal}`,
            `badge-${variant}`,
            {
               'badge-hover': hover,
            }
         )}
         onMouseEnter={() => {
            if (showOnHover) setHover(true);
         }}
         onMouseLeave={() => {
            if (showOnHover) setHover(false);
         }}
         {...props}
      >
         {hover ? BadgeContent : badgeContentDisplay}
      </span>
   );
}

export default Badge;
