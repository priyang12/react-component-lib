import {
   AccordionButton,
   AccordionContent,
   AccordionIcon,
} from './AccordionItems';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useAccordion } from '../../../Hooks/useAccordion';
import { AccordionContext } from '../../Module/Accordion/Accordion';
export default {
   title: 'Atoms/AccordionItems',
   component: AccordionButton,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof AccordionButton>;

export const Template: ComponentStory<typeof AccordionButton> = args => {
   const { Indexes, handleItemClick } = useAccordion({
      initialOpenIndexes: [],
   });

   return (
      <AccordionContext.Provider
         value={{
            indexes: Indexes,
            handleItemClick,
         }}
      >
         <AccordionButton
            aria-controls="1-content"
            aria-labelledby="1-title"
            index={0}
         >
            <h1 id="1-title">item one</h1>
            <AccordionIcon CloseIcon="👇" OpenIcon="👈" index={0} />
         </AccordionButton>
         <AccordionContent id="1-content" index={0}>
            <div>
               Horses can sleep both lying down and standing up. Domestic horses
               have a lifespan of around 25 years. A 19th century horse named
               'Old Billy' is said to have lived 62 years.
            </div>
         </AccordionContent>
      </AccordionContext.Provider>
   );
};
