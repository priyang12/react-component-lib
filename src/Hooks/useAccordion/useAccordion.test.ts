import { act } from 'react';
import { renderHook } from '@testing-library/react';
import {
   AccordionReducer,
   useAccordion,
   AccordionState,
   AccordionAction,
} from './useAccordion';

describe('AccordionReducer', () => {
   it('should open index if not already open (toggle)', () => {
      const state: AccordionState = { openIndexes: [] };
      const action: AccordionAction = { type: 'toggle', index: 1 };

      const newState = AccordionReducer(state, action);
      expect(newState.openIndexes).toEqual([1]);
   });

   it('should close index if already open (toggle)', () => {
      const state: AccordionState = { openIndexes: [1, 2] };
      const action: AccordionAction = { type: 'toggle', index: 2 };

      const newState = AccordionReducer(state, action);
      expect(newState.openIndexes).toEqual([1]);
   });

   it('should close index if already open (oneToggle)', () => {
      const state: AccordionState = { openIndexes: [3] };
      const action: AccordionAction = { type: 'oneToggle', index: 3 };

      const newState = AccordionReducer(state, action);
      expect(newState.openIndexes).toEqual([]);
   });
});

describe('useAccordion hook', () => {
   it('should initialize with given indexes', () => {
      const { result } = renderHook(() =>
         useAccordion({ initialOpenIndexes: [0, 2] })
      );

      expect(result.current.openIndexes).toEqual([0, 2]);
   });

   it('should toggle index open and close', () => {
      const { result } = renderHook(() =>
         useAccordion({ initialOpenIndexes: [] })
      );

      act(() => {
         result.current.toggle(1);
      });
      expect(result.current.openIndexes).toEqual([1]);

      act(() => {
         result.current.toggle(1);
      });
      expect(result.current.openIndexes).toEqual([]);
   });

   it('should set only one open index using OneAlwaysOpen', () => {
      const { result } = renderHook(() =>
         useAccordion({ initialOpenIndexes: [0, 1] })
      );

      act(() => {
         result.current.OneAlwaysOpen(2);
      });
      expect(result.current.openIndexes).toEqual([2]);

      act(() => {
         result.current.OneAlwaysOpen(2);
      });
      expect(result.current.openIndexes).toEqual([]);
   });

   it('should work with a custom reducer', () => {
      const CustomReducer = (
         state: AccordionState,
         action: AccordionAction
      ) => {
         if (action.type === 'toggle') {
            return {
               openIndexes:
                  action.index !== 3
                     ? state.openIndexes.filter(
                          (item) => item !== action.index // if it's 3 ignore
                       )
                     : state.openIndexes,
            };
         }
         return AccordionReducer(state, action);
      };

      const { result } = renderHook(() =>
         useAccordion({
            initialOpenIndexes: [1, 2, 3],
            CustomReducer,
         })
      );

      act(() => {
         result.current.toggle(1);
      });
      expect(result.current.openIndexes).toEqual([2, 3]);

      act(() => {
         result.current.toggle(3); // will not toggle
      });
      expect(result.current.openIndexes).toEqual([2, 3]);
   });
});
