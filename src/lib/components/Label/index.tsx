import * as React from 'react';
import './Label.scss';

function Label(props: any): React.ReactElement {
   const { children, hidden, size, alert, ...restProps } = props;

   return (
      <label
         {...restProps}
         className={`${size} ${hidden ? 'visually-hidden' : 'show'} `}
         style={alert ? { color: 'red' } : {}}
      >
         {alert ? alert : children}
      </label>
   );
}
export default Label;
