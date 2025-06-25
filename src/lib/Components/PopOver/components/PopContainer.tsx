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

export interface PopContainerProps
   extends React.ComponentPropsWithoutRef<'div'> {}

const PopContainer = ({ children, ...props }: PopContainerProps) => {
   const [state, toggleState, setState] = useToggle();
   return (
      <PopOverContext.Provider
         value={{
            showContent: state,
            toggleContent: toggleState,
            setContentState: setState,
         }}
      >
         <div className="popContainer" {...props}>
            {children}
         </div>
      </PopOverContext.Provider>
   );
};

export default PopContainer;
