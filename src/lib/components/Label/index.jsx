import React from 'react';
import './Label.scss';
function Label(props) {
   const { children, hidden, size, alert, ...restProps } = props;
   console.log(alert);
   return (
      <label
         {...restProps}
         className={`${size}  ${hidden ? 'visually-hidden' : ''} ${
            restProps?.className
         }`}
         style={alert ? { color: 'red' } : {}}
      >
         {/* {alert ? alert : children} */}
         {children}
      </label>
   );
}
export default Label;
