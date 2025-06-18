import React from 'react';
import { clsx } from 'clsx';
import './GradientHover.scss';

function GradientHover({
   children,
   BorderSize,
   animation,
   ...props
}: {
   children: React.ReactNode;
   BorderSize?: string;
   animation: string;
}) {
   // const Element = as || 'button';
   const { className } = props as any;
   const gradientClass = clsx('gradient-layer', className);
   return (
      <div
         className={gradientClass}
         style={{
            animation: animation,
            padding: BorderSize,
         }}
      >
         <div className="gradient-hover__content">{children}</div>
      </div>
   );
}

export default GradientHover;
