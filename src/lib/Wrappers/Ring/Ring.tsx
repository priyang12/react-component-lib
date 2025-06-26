import React from 'react';
import { clsx } from 'clsx';
import { Slot } from '../Util/AsChildSlot';
import './Ring.scss';

export interface BaseProps {
   radius?: string;
   ringColor?: string;
   ringWidth?: string;
   OuterRingColor?: string;
   className?: string;
   asChild?: boolean;
   children: React.ReactNode;
}

type RingAsChild = {
   asChild: true;
} & BaseProps;

type RingAsDiv = {
   asChild?: false;
} & BaseProps &
   React.ComponentPropsWithoutRef<'div'>;

export type RingProps = RingAsChild | RingAsDiv;

function Ring({
   children,
   radius,
   ringColor,
   ringWidth = '5px',
   OuterRingColor,
   asChild = false,
   className,
   ...props
}: RingAsChild | RingAsDiv) {
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
