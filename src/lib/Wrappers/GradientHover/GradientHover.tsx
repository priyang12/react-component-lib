import React from 'react';
import { clsx } from 'clsx';
import { Slot } from '../Util/AsChildSlot';
import './GradientHover.scss';

export interface BaseProps {
   BorderSize?: string;
   animation: string;
   className?: string;
   asChild?: boolean;
   children: React.ReactNode;
}

type GradientHoverAsChild = {
   asChild: true;
} & BaseProps;

type GradientHoverAsDiv = {
   asChild?: false;
} & BaseProps &
   React.ComponentPropsWithoutRef<'div'>;

type GradientHoverProps = GradientHoverAsChild | GradientHoverAsDiv;

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
