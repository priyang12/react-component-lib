import React, { useMemo, useState } from 'react';
import lodash from 'lodash.debounce';
import { Button } from '../Button';
import './DescriptionContainer.scss';

type DescriptionContainerProps = {
   children: React.ReactNode;
   style?: React.CSSProperties;
   width?: string;
   HiddenContainerHeight?: string;
   exitFunction?: () => void;
};

function DescriptionContainer({
   exitFunction,
   width,
   children,
   HiddenContainerHeight,
}: DescriptionContainerProps) {
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
      <div
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
      </div>
   );
}

DescriptionContainer.defaultProps = {
   width: '20%',
   exitFunction: () => {},
};

export default DescriptionContainer;
