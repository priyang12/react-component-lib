import React from "react";
import "./GradientHover.scss";

const GradientHover = ({ children, animationTime }) => {
  return (
    <div
      className="gradient-layer"
      style={{
        animationDuration: `${animationTime}`,
      }}
    >
      <div className="gradient-hover__content">{children}</div>
    </div>
  );
};

export default GradientHover;
