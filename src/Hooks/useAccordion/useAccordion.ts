import { useReducer } from 'react';

/**
 * Represents the state of the accordion component.
 * `openIndexes` holds the list of currently open accordion item indexes.
 */
export type AccordionState = {
   openIndexes: number[];
};

const defaultState: AccordionState = {
   openIndexes: [],
};

/**
 * Represents an action that can be dispatched to the accordion reducer.
 * - `'toggle'`: Toggles the open/closed state of a specific index.
 * - `'oneToggle'`: Ensures only one index is open at a time.
 */
export type AccordionAction = {
   type: 'toggle' | 'oneToggle';
   index: number;
};

/**
 * Reducer function for managing the open/closed state of an accordion.
 *
 * @param state - Current accordion state.
 * @param action - Action to update the state.
 * @returns Updated accordion state based on the action type.
 *
 * Actions:
 * - `toggle`: Toggles the specified index. Allows multiple items to be open.
 * - `oneToggle`: Toggles the specified index. Ensures only one item is open at a time.
 *
 */
export function AccordionReducer(
   state: AccordionState,
   action: AccordionAction
): AccordionState {
   switch (action.type) {
      case 'toggle':
         return {
            openIndexes: state.openIndexes.includes(action.index)
               ? state.openIndexes.filter((i) => i !== action.index)
               : [...state.openIndexes, action.index],
         };
      case 'oneToggle':
         return {
            openIndexes: state.openIndexes.includes(action.index)
               ? state.openIndexes.filter((i) => i !== action.index)
               : [action.index],
         };
      default:
         return state;
   }
}

/**
 * Custom hook for managing accordion open state using a reducer.
 *
 * @param options - Hook configuration options.
 * @param options.CustomReducer - Optional custom reducer to override the default logic.
 * @param options.initialOpenIndexes - Initial list of open accordion item indexes.
 * @returns An object with:
 * - `openIndexes`: Current open indexes.
 * - `toggle`: Function to toggle the state of a given index.
 * - `OneAlwaysOpen`: Function to allow only one index open at a time.
 */
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

   function toggle(index: number) {
      dispatch({ type: 'toggle', index });
   }

   function OneAlwaysOpen(index: number) {
      dispatch({ type: 'oneToggle', index });
   }

   return {
      Indexes: state.openIndexes, // remove this later
      openIndexes: state.openIndexes,
      toggle,
      OneAlwaysOpen,
   };
}
