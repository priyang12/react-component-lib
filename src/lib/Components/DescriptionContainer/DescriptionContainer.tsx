import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import './DescriptionContainer.scss';

export interface DescriptionContainerProps
   extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
   defaultShow?: boolean;
   hiddenContainerHeight?: string;
   exitFunction?: () => void;
   renderDescription: () => React.ReactNode;
   children: (handlers: { onMouseOver: () => void }) => React.ReactNode;
}

function DescriptionContainer({
   defaultShow = false,
   hiddenContainerHeight,
   exitFunction = () => {},
   renderDescription,
   children,
   ...props
}: DescriptionContainerProps) {
   const [show, setShow] = useState(defaultShow);
   const [hidden, setHidden] = useState(!defaultShow);
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   const Enter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (!show) {
         setShow(true);
         setHidden(false);
      }
   };
   const handleExit = () => {
      setShow(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
         setHidden(true);
      }, 1000);
   };
   return (
      <div
         {...props}
         className={clsx('descriptionContainer', props.className)}
         onMouseLeave={handleExit}
      >
         {children({ onMouseOver: Enter })}
         <div
            className={clsx('hidden-container', hidden ? 'hideContainer' : '')}
            style={
               {
                  '--description-height': hiddenContainerHeight,
               } as React.CSSProperties
            }
         >
            <div className={`${show ? 'show' : 'hide'}`}>
               {renderDescription()}
            </div>
         </div>
      </div>
   );
}

export default DescriptionContainer;
