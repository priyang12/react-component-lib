import React from 'react';
import { clsx } from 'clsx';
import { Slot } from '../Util/AsChildSlot';
import './Ring.scss';

/**
 * Props for the Ring component.
 *
 * Allows wrapping a child element or a `div` with a customizable ring-style border using CSS variables.
 * Supports rendering via `asChild` for flexible composition or as a regular `div` by default.
 *
 * @property radius - Optional CSS border-radius to apply to the ring.
 * @property trigger - Determines how the ring is triggered.  `['hover', 'focus']`
 * @property ringColor - Color of the inner ring border.
 * @property ringWidth - Width of the inner ring. Defaults to `'5px'`.
 * @property OuterRingColor - Optional color for an outer offset ring.
 * @property className - Additional class names for custom styling.
 * @property asChild - If `true`, renders the component using a Slot wrapper to support composition. Defaults to `false`.
 * @property children - The content to render inside the ring.
 */
export interface BaseProps {
   /** Optional CSS border-radius for the ring element. */
   radius?: string;
   /** Determines how the ring is triggered.  `['hover', 'focus']`: supports both interactions  */
   trigger?: 'hover' | 'focus' | ('hover' | 'focus')[];
   /** Color of the main ring (sets the `--ring-color` CSS variable). */
   ringColor?: string;
   /** Width of the main ring. Defaults to `'5px'`. */
   ringWidth?: string;
   /** Optional color for the outer ring offset (`--ring-offset-color`). */
   OuterRingColor?: string;
   /** Custom class names to extend styling. */
   className?: string;
   /** Whether to render using `Slot` instead of a `div`. */
   asChild?: boolean;
   /** Child content to be wrapped with the ring effect. */
   children: React.ReactNode;
}

type RingProps = BaseProps &
   (
      | { asChild: true }
      | ({ asChild?: false } & React.ComponentPropsWithoutRef<'div'>)
   );

/**
 * Ring component for visually highlighting content with a customizable border effect.
 *
 * Useful for focus states, selection indicators, or status outlines.
 * Can be rendered as a standard `div` or wrapped around another component using `asChild`.
 */
function Ring({
   asChild = false,
   radius,
   trigger = 'hover',
   ringColor,
   ringWidth = '5px',
   OuterRingColor,
   className,
   children,
   ...props
}: RingProps) {
   // const triggerClass = normalizedTrigger.map((t) => `trigger-${t}`).join(' ');

   const RingClass = clsx('Ring', className, {
      'trigger-hover': trigger.includes('hover'),
      'trigger-focus': trigger.includes('focus'),
   });
   const RenderEle = asChild ? Slot : 'div';

   return (
      <RenderEle
         tabIndex={trigger.includes('focus') ? 0 : -1}
         className={RingClass}
         style={
            {
               '--ring-color': ringColor,
               '--ring-width': `calc(${ringWidth} + 2px)`,
               '--ring-offset-color': OuterRingColor,
               borderRadius: radius,
            } as React.CSSProperties
         }
         {...props}
      >
         {children}
      </RenderEle>
   );
}

export default Ring;
