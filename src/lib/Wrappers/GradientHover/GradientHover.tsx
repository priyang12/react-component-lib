import React from 'react';
import { clsx } from 'clsx';
import { Slot } from '../Util/AsChildSlot';
import './GradientHover.scss';

/**
 * Props for the `GradientHover` component.
 *
 * Wraps any element with a gradient hover border effect. Supports `asChild` pattern for flexible composition.
 *
 * @property BorderSize - Optional padding to simulate the border thickness around the inner content.
 * @property animation - CSS animation string to control the gradient movement or effect.
 * @property className - Optional custom class for the outer wrapper.
 * @property asChild - If `true`, uses the passed child element directly via `Slot`. If `false` or omitted, wraps with a `div`.
 * @property children - The content to render inside the gradient wrapper.
 */
export interface BaseProps {
   /** Optional padding to simulate the border thickness around the inner content. */
   BorderSize?: string;
   /** CSS animation string to control the gradient movement or effect. */
   animation: string;
   /** Optional custom class for the outer wrapper. */
   className?: string;
   /** If `true`, uses the passed child element directly via `Slot`. If `false` or omitted, wraps with a `div`. */
   asChild?: boolean;
   /** The content to render inside the gradient wrapper. */
   children: React.ReactNode;
}

type GradientHoverAsChild = {
   asChild: true;
} & BaseProps;

type GradientHoverAsDiv = {
   asChild?: false;
} & BaseProps &
   React.ComponentPropsWithoutRef<'div'>;

export type GradientHoverProps = GradientHoverAsChild | GradientHoverAsDiv;

/**
 * `GradientHover` is a wrapper component that applies an animated gradient border effect on hover or render.
 *
 * You can optionally render it using the `asChild` pattern to preserve semantic or structural HTML of the child element.
 *
 * @returns A wrapper element with animated gradient border and content inside.
 */

function GradientHover({
   BorderSize,
   animation,
   asChild,
   className,
   children,
   ...props
}: GradientHoverProps) {
   const RenderEle = asChild ? Slot : 'div';
   const gradientClass = clsx('gradient-layer', className);

   return (
      <RenderEle
         className={gradientClass}
         style={{
            animation: animation,
            padding: BorderSize,
         }}
         {...props}
      >
         <div className="gradient-hover__content">{children}</div>
      </RenderEle>
   );
}

export default GradientHover;
