import * as React from 'react';
import { useToggle } from '../../../../Hooks';
import {
   MiddlewareData,
   Placement,
   arrow,
   autoUpdate,
   flip,
   offset,
   useFloating,
} from '@floating-ui/react';

export type popContextType = {
   showContent: boolean;
   toggleContent: () => void;
   setContentState: (value: boolean) => void;
   setFloating: ((node: HTMLElement | null) => void) &
      ((node: HTMLElement | null) => void);
   floatingStyles: React.CSSProperties;
   arrowRef: React.MutableRefObject<null>;
   middlewareData: MiddlewareData;
   placement: Placement;
};

const PopOverContext = React.createContext({} as popContextType);

export const usePopContext = () => {
   const context = React.useContext(PopOverContext);
   if (!context) {
      throw new Error('usePopContext must be used within a <PoPContext>');
   }
   return context;
};

export interface popContainerProps
   extends React.ComponentPropsWithoutRef<'div'> {
   defaultIsOpen?: boolean;
   containerRef?: React.MutableRefObject<null>;
   isFlip?: boolean;
   containerPlacement?: Placement;
}

const PopContainer = React.forwardRef<HTMLDivElement, popContainerProps>(
   (
      {
         defaultIsOpen,
         containerRef,
         isFlip = false,
         containerPlacement = 'bottom',
         children,
         ...props
      },
      ref
   ) => {
      const arrowRef = React.useRef(null);
      const { value, setToggleValue, toggleValue } = useToggle(defaultIsOpen);
      const { refs, floatingStyles, middlewareData, placement } = useFloating({
         middleware: [
            isFlip ? flip() : undefined,
            arrow({
               element: arrowRef,
            }),
            offset(5),
         ],
         placement: containerPlacement,
         whileElementsMounted: autoUpdate,
      });

      const setRefs = (node: any) => {
         if (ref && typeof ref !== 'function') ref.current = node;
         refs.setReference(node);
      };

      return (
         <PopOverContext.Provider
            value={{
               showContent: value,
               toggleContent: toggleValue,
               setContentState: setToggleValue,

               // floating props
               setFloating: refs.setFloating,
               floatingStyles,
               arrowRef,
               middlewareData,
               placement,
            }}
         >
            <div className="popContainer" ref={setRefs} {...props}>
               {children}
            </div>
         </PopOverContext.Provider>
      );
   }
);

export default PopContainer;
