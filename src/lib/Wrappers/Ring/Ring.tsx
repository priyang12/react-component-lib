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

type RingAsChild = {
   asChild: true;
} & BaseProps;

type RingAsDiv = {
   asChild?: false;
} & BaseProps &
   React.ComponentPropsWithoutRef<'div'>;

// this is stopping the argTable to not generate with props
export type RingProps = RingAsChild | RingAsDiv;

/**
 * Ring component for visually highlighting content with a customizable border effect.
 *
 * Useful for focus states, selection indicators, or status outlines.
 * Can be rendered as a standard `div` or wrapped around another component using `asChild`.
 */
function Ring({
   asChild = false,
   radius,
   ringColor,
   ringWidth = '5px',
   OuterRingColor,
   className,
   children,
   ...props
}: RingProps) {
   const RingClass = clsx('Ring', className);
   const RenderEle = asChild ? Slot : 'div';

   return (
      <RenderEle
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
