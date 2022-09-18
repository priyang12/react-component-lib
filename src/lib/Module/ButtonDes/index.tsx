import React, { useMemo, useState } from 'react';
import lodash from 'lodash.debounce';
import { Button } from '../../Atoms/Button';
import { chakra } from '@chakra-ui/system';
import './ButtonDes.scss';

type ButtonProps = {
   children: React.ReactNode;
   style?: React.CSSProperties;
   width?: string;
   HiddenContainerHeight?: string;
   exitFunction?: () => void;
};

function ButtonDes({
   exitFunction,
   width,
   children,
   HiddenContainerHeight,
}: ButtonProps) {
   const [show, setShow] = useState(false);
   const [hidden, setHidden] = useState(true);

   const debouncedHandleMouseExit = useMemo(
      () =>
         lodash(() => {
            setHidden(true);
            if (typeof exitFunction !== 'undefined') {
               exitFunction();
            }
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
   return (
      <chakra.div
         className="Button-container"
         style={{
            width: width,
         }}
         onMouseLeave={handleExit}
      >
         {React.Children.map(children, (child: any) => {
            switch (child.type) {
               case Button:
                  return React.cloneElement(child, {
                     onMouseEnter: Enter,
                  });

               default:
                  return (
                     <div
                        className={`hidden-container ${hidden ? 'hidden' : ''}`}
                        style={{
                           // @ts-ignore
                           '--Description-height': HiddenContainerHeight,
                        }}
                     >
                        <div className={`${show ? 'show' : 'hide'}`}>
                           {child}
                        </div>
                     </div>
                  );
            }
         })}
      </chakra.div>
   );
}

ButtonDes.defaultProps = {
   width: '20%',
   exitFunction: () => {},
};

export default ButtonDes;
