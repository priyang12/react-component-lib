import * as React from 'react';
import { useAccordion } from '../../../Hooks/useAccordion';
import './Accordion.scss';

export type AccordionContextType = {
   indexes: number[];
   handleItemClick: (index: number) => void;
};

export const AccordionContext = React.createContext({} as AccordionContextType);

export interface AccordionProps extends React.ComponentPropsWithoutRef<'div'> {
   /** option for opening only one Item. */
   OnlyOne: boolean;
   /** initial Indexes for Accordion Context. */
   initialOpenIndexes?: number[];
}

function Accordion({
   initialOpenIndexes = [],
   OnlyOne,
   children,
   ...props
}: AccordionProps) {
   const {
      Indexes,
      toggle: handleItemClick,
      OneAlwaysOpen,
   } = useAccordion({
      initialOpenIndexes,
   });
   return (
      <AccordionContext.Provider
         value={{
            handleItemClick: !OnlyOne ? handleItemClick : OneAlwaysOpen,
            indexes: Indexes,
         }}
      >
         <div className="Accordion" {...props}>
            {children}
         </div>
      </AccordionContext.Provider>
   );
}

export default Accordion;
