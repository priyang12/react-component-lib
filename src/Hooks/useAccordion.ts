import { useReducer } from 'react';

export type AccordionState = {
   openIndexes: number[];
};

export type AccordionAction = {
   type: 'toggle' | 'oneToggle';
   index: number;
};

const defaultState: AccordionState = {
   openIndexes: [],
};

export function AccordionReducer(
   state: AccordionState,
   action: AccordionAction
): AccordionState {
   switch (action.type) {
      case 'toggle':
         return {
            openIndexes: state.openIndexes.includes(action.index)
               ? state.openIndexes.filter(i => i !== action.index)
               : [...state.openIndexes, action.index],
         };
      case 'oneToggle':
         return {
            openIndexes: state.openIndexes.includes(action.index)
               ? state.openIndexes.filter(i => i !== action.index)
               : [action.index],
         };
      default:
         return state;
   }
}

export function useAccordion({
   CustomReducer = AccordionReducer,
   initialOpenIndexes,
}: {
   CustomReducer?: typeof AccordionReducer;
   initialOpenIndexes: number[];
}) {
   const [state, dispatch] = useReducer(CustomReducer, {
      ...defaultState,
      openIndexes: initialOpenIndexes,
   });

   function handleItemClick(index: number) {
      dispatch({ type: 'toggle', index });
   }

   function OneAlwaysOpen(index: number) {
      dispatch({ type: 'oneToggle', index });
   }

   return { Indexes: state.openIndexes, handleItemClick, OneAlwaysOpen };
}
