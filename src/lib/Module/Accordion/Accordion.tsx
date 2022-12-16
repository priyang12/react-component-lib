import * as React from 'react';
import { useAccordion } from '../../../Hooks/useAccordion';
import './Accordion.scss';

export type Item = {
   title: string;
   content: string;
};

export type AccordionContextType = {
   indexes: number[];
   handleItemClick: (index: number) => void;
};

export const AccordionContext = React.createContext({} as AccordionContextType);

// hook inspired by Kent C Todds workshop.

function Accordion({
   initialOpenIndexes = [],
   OnlyOne,
   children,
}: {
   OnlyOne: boolean;
   initialOpenIndexes?: number[];
} & React.ComponentPropsWithoutRef<'div'>) {
   const { Indexes, handleItemClick, OneAlwaysOpen } = useAccordion({
      initialOpenIndexes,
   });
   return (
      <AccordionContext.Provider
         value={{
            handleItemClick: !OnlyOne ? handleItemClick : OneAlwaysOpen,
            indexes: Indexes,
         }}
      >
         <div className="Accordion">{children}</div>
      </AccordionContext.Provider>
   );
}

export default Accordion;
