import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from './useCounter'; // update with correct path

describe('useCounter', () => {
   it('initializes with initialCount if within min/max', () => {
      const { result } = renderHook(() => useCounter(5, { min: 0, max: 10 }));
      expect(result.current.Count).toBe(5);
   });

   it('initializes with min if min > initialCount', () => {
      const { result } = renderHook(() => useCounter(2, { min: 5, max: 10 }));
      expect(result.current.Count).toBe(5);
   });

   it('increments correctly within bounds', () => {
      const { result } = renderHook(() => useCounter(1, { min: 0, max: 3 }));

      act(() => result.current.Increment());
      expect(result.current.Count).toBe(2);

      act(() => result.current.Increment());
      expect(result.current.Count).toBe(3);

      act(() => result.current.Increment()); // should not exceed max
      expect(result.current.Count).toBe(3);
   });

   it('decrements correctly within bounds', () => {
      const { result } = renderHook(() => useCounter(3, { min: 1, max: 5 }));

      act(() => result.current.Decrement());
      expect(result.current.Count).toBe(2);

      act(() => result.current.Decrement());
      expect(result.current.Count).toBe(1);

      act(() => result.current.Decrement()); // should not go below min
      expect(result.current.Count).toBe(1);
   });

   it('rounds increment to min if at max', () => {
      const { result } = renderHook(() => useCounter(3, { min: 1, max: 3 }));

      act(() => result.current.RoundIncrement());
      expect(result.current.Count).toBe(1);
   });

   it('rounds decrement to max if at min', () => {
      const { result } = renderHook(() => useCounter(1, { min: 1, max: 3 }));

      act(() => result.current.RoundDecrement());
      expect(result.current.Count).toBe(3);
   });

   it('setCounter updates value directly', () => {
      const { result } = renderHook(() => useCounter(0, { min: 0, max: 10 }));

      act(() => result.current.setCounter(7));
      expect(result.current.Count).toBe(7);
   });

   it('resetCounter sets count to initial value and restores min/max', () => {
      const { result } = renderHook(() => useCounter(2, { min: 1, max: 4 }));

      act(() => result.current.setCounter(3));
      act(() => result.current.setMaxCounter(10));
      act(() => result.current.setMinCounter(0));

      act(() => result.current.resetCounter());
      expect(result.current.Count).toBe(2);
      act(() => result.current.Increment());
      expect(result.current.Count).toBe(3); // max is reset to 4
   });

   it('restToZero resets everything to 0', () => {
      const { result } = renderHook(() => useCounter(5, { min: 2, max: 8 }));

      act(() => result.current.restToZero());
      expect(result.current.Count).toBe(0);

      act(() => result.current.Increment());
      expect(result.current.Count).toBe(0); // max is now 0
   });

   it('tracks PreviousState correctly', () => {
      const { result } = renderHook(() => useCounter(0, { min: 0, max: 5 }));

      act(() => result.current.Increment());
      expect(result.current.PreviousState).toBe(0);

      act(() => result.current.Increment());
      expect(result.current.PreviousState).toBe(1);
   });
});
