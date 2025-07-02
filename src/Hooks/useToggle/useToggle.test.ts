import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('useToggle', () => {
   it('should initialize with false by default', () => {
      const { result } = renderHook(() => useToggle());
      expect(result.current.value).toBe(false);
   });

   it('should initialize with a custom initial value', () => {
      const { result } = renderHook(() => useToggle(true));
      expect(result.current.value).toBe(true);
   });

   it('should toggle the value', () => {
      const { result } = renderHook(() => useToggle());

      act(() => {
         result.current.toggleValue();
      });
      expect(result.current.value).toBe(true);

      act(() => {
         result.current.toggleValue();
      });
      expect(result.current.value).toBe(false);
   });

   it('should set the value directly to true', () => {
      const { result } = renderHook(() => useToggle());

      act(() => {
         result.current.setToggleValue(true);
      });
      expect(result.current.value).toBe(true);
   });

   it('should set the value directly to false', () => {
      const { result } = renderHook(() => useToggle(true));

      act(() => {
         result.current.setToggleValue(false);
      });
      expect(result.current.value).toBe(false);
   });

   it('toggleValue and setToggleValue should be memoized', () => {
      const { result, rerender } = renderHook(() => useToggle());

      const toggleRef = result.current.toggleValue;
      const setToggleRef = result.current.setToggleValue;

      rerender();

      expect(result.current.toggleValue).toBe(toggleRef);
      expect(result.current.setToggleValue).toBe(setToggleRef);
   });
});
