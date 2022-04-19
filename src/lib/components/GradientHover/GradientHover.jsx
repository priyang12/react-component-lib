import React from "react";
import "./GradientHover.scss";

const GradientHover = ({ children }) => {
  return (
    <div className="gradient-hover">
      <div className="gradient-hover__content">{children}</div>
    </div>
  );
};

export default GradientHover;
