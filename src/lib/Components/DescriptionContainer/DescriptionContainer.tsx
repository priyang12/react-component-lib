import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import './DescriptionContainer.scss';

/**
 * Props for the `DescriptionContainer` component.
 *
 * Provides a wrapper that reveals a description panel on hover, with timed hiding logic and customizable rendering.
 *
 * @property defaultShow - Whether the description should be visible by default. Defaults to `false`.
 * @property direction - Direction in which way the container should expand and hide. Defaults to `Vertical`.
 * @property hiddenContainerHeight - Optional height of the hidden container (used as a CSS variable).
 * @property hiddenContainerWidth - Optional width of the hidden container (used as a CSS variable).
 * @property exitFunction - Optional callback invoked when the mouse leaves the container.
 * @property renderDescription - Function that returns the JSX content to render in the description panel.
 * @property children - A render prop function that receives hover handlers to apply to trigger elements.
 */
export interface DescriptionContainerProps
   extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
   /** Whether the description panel should be shown initially. */
   defaultShow?: boolean;
   /** Direction in which way the container should expand and hide. */
   direction?: 'Horizontal' | 'Vertical';
   /** Custom CSS height value for the hidden container. */
   hiddenContainerHeight?: string;
   /** Custom CSS width value for the hidden container. */
   hiddenContainerWidth?: string;
   /** Optional callback executed when the container exits (on mouse leave). */
   exitFunction?: () => void;
   /** Function that renders the content inside the description panel. */
   renderDescription: () => React.ReactNode;
   /**
    * Render prop that receives an object with an `onMouseOver` handler.
    * Should be used on the element that triggers the description reveal.
    */
   children: (handlers: { onMouseOver: () => void }) => React.ReactNode;
}

/**
 * `DescriptionContainer` is a hover-sensitive component that reveals a description panel.
 *
 * Supports custom description rendering, transition delays, and dynamic height via CSS variables.
 * Useful for tooltips, previews, or interactive UI elements that show contextual information.
 */

function DescriptionContainer({
   defaultShow = false,
   direction = 'Vertical',
   hiddenContainerHeight = '100px',
   hiddenContainerWidth = '100px',
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
      exitFunction();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
         setHidden(true);
      }, 1000);
   };
   return (
      <div
         {...props}
         className={clsx(
            'descriptionContainer',
            `descriptionContainer-${direction}`,
            props.className
         )}
         onMouseLeave={handleExit}
      >
         {children({ onMouseOver: Enter })}
         <div
            className={clsx('hidden-container', {
               hideContainer: hidden,
            })}
            style={
               {
                  '--description-height': hiddenContainerHeight,
                  '--description-width': hiddenContainerWidth,
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
