import React from 'react';
import './Input.scss';

function Input(props) {
   const { size, alert, ...rest } = props;

   return <input {...rest} className={`${size} ${alert ? 'alert' : ''}`} />;
}
export default Input;
