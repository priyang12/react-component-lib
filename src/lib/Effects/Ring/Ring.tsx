import React from 'react';
import { cx } from '@chakra-ui/utils';
import './Ring.scss';

export interface RingProps extends React.ComponentPropsWithoutRef<'div'> {
   radius?: string;
   ringColor?: string;
   ringWidth?: string;
   OuterRingColor?: string;
   className?: string;
   children: React.ReactNode;
}

function Ring({
   children,
   radius,
   ringColor,
   ringWidth = '5px',
   OuterRingColor,
   className,
   ...props
}: RingProps) {
   const RingClass = cx('ring', className);
   return (
      <div
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
      </div>
   );
}

export default Ring;
