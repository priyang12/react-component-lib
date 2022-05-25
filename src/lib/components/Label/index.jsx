import React from 'react';
import './Label.scss';
function Label(props) {
   const { children, hidden, ...restProps } = props;

   return (
      <label
         {...restProps}
         className={`${hidden ? 'visually-hidden' : ''} ${
            restProps?.className
         }`}
      >
         {children}
      </label>
   );
}
export default Label;
