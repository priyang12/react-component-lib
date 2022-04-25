import React from 'react';
import './GradientHover.scss';

const GradientHover = ({ children, BorderSize, animation }) => {
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
