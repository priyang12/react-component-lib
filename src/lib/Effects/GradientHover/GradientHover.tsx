import React from 'react';
import './GradientHover.scss';

const GradientHover: React.FC<{
   children: React.ReactNode;
   BorderSize: string;
   animation: string;
}> = ({ children, BorderSize, animation }) => {
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
};

export default GradientHover;
