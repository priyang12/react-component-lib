import React, { useState } from 'react';
import Button from '../../components/Button';
import './ButtonDes.scss';
function ButtonDes({ exitFunction, width, children }) {
   const [show, setshow] = useState(false);
   const [hidden, sethidden] = useState(true);
   return (
      <div
         className="Button-container"
         style={{
            width: width,
         }}
         onMouseLeave={() => {
            setshow(false);
            // Creating Race Conditions Need to replace with Debounce
            setTimeout(() => {
               sethidden(true);
               exitFunction();
            }, 1000);
         }}
      >
         <Button
            style={{
               backgroundColor: '#ee37dc',
               fontSize: '1.5rem',
               padding: '.5rem 2rem',
            }}
            radius={'1.5rem'}
            onMouseEnter={() => {
               setshow(true);
               sethidden(false);
            }}
         >
            Click
         </Button>

         <div className={`description ${hidden ? 'hidden' : ''}`}>
            <div className={`${show ? 'show' : 'hide'}`}>{children}</div>
         </div>
      </div>
   );
}

ButtonDes.defaultProps = {
   width: '20%',
   exitFunction: () => {},
};

export default ButtonDes;
