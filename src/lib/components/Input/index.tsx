import * as React from 'react';
import './Input.scss';

function Input(props: {
   size: 'small' | 'medium' | 'large';
   type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
   alert?: any;
   [x: string]: any;
}): React.ReactElement {
   const { size, alert, ...rest } = props;

   return <input {...rest} className={`${size} ${alert ? 'alert' : ''}`} />;
}

export default Input;
