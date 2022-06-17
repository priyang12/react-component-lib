import React from 'react';
import './Label.scss';
function Label(props) {
   const { children, hidden, size, alert, ...restProps } = props;

   return (
      <label
         {...restProps}
         className={`${size} ${hidden ? 'visually-hidden' : 'show'} ${
            restProps?.className
         }`}
         style={alert ? { color: 'red' } : {}}
      >
         {alert ? alert : children}
      </label>
   );
}
export default Label;
