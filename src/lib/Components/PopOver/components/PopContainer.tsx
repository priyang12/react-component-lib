import * as React from 'react';
import { useToggle } from '../../../../Hooks';

export type popContextType = {
   showContent: boolean;
   toggleContent: () => void;
   setContentState: (value: boolean) => void;
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
}

const PopContainer = React.forwardRef<HTMLDivElement, popContainerProps>(
   ({ defaultIsOpen, containerRef, children, ...props }, ref) => {
      const { value, setToggleValue, toggleValue } = useToggle(defaultIsOpen);
      return (
         <PopOverContext.Provider
            value={{
               showContent: value,
               toggleContent: toggleValue,
               setContentState: setToggleValue,
            }}
         >
            <div className="popContainer" ref={ref} {...props}>
               {children}
            </div>
         </PopOverContext.Provider>
      );
   }
);

export default PopContainer;
