import React from 'react';
import './Input.scss';

function Input(props) {
   const { size, ...rest } = props;

   return <input className={size} {...rest} />;
}
export default Input;
