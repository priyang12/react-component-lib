import React, { useMemo, useState } from 'react';
import Button from '../../components/Button';
import lodash from 'lodash.debounce';
import './ButtonDes.scss';
function ButtonDes({ exitFunction, width, children }) {
   const [show, setShow] = useState(false);
   const [hidden, setHidden] = useState(true);

   const debouncedHandleMouseExit = useMemo(
      () =>
         lodash(() => {
            setHidden(true);
            exitFunction();
         }, 1000),
      [setHidden, exitFunction]
   );

   const Enter = () => {
      debouncedHandleMouseExit.cancel();
      setShow(true);
      setHidden(false);
   };
   const handleExit = () => {
      setShow(false);
      debouncedHandleMouseExit();
   };
   console.log(width);
   return (
      <div
         className="Button-container"
         style={{
            width: width,
         }}
         onMouseLeave={handleExit}
      >
         {React.Children.map(children, (child) => {
            switch (child.type) {
               case Button:
                  return React.cloneElement(child, {
                     onMouseEnter: Enter,
                  });
               default:
                  return (
                     <div
                        className={`hidden-container ${hidden ? 'hidden' : ''}`}
                     >
                        <div className={`${show ? 'show' : 'hide'}`}>
                           {child}
                        </div>
                     </div>
                  );
            }
         })}
      </div>
   );
}

ButtonDes.defaultProps = {
   width: '20%',
   exitFunction: () => {},
};

export default ButtonDes;
