import React from 'react';
import './GradientHover.scss';

function GradientHover({
   children,
   BorderSize,
   animation,
}: {
   children: React.ReactNode;
   BorderSize: string;
   animation: string;
}) {
   return (
      <div
         className="gradient-layer"
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
