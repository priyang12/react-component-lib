import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useBackgroundTime } from './useBackgroundTime'; // update path as needed

describe('useBackgroundTime', () => {
   beforeEach(() => {
      vi.useFakeTimers();
   });

   afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
   });

   it('should initialize seconds to 0', () => {
      const { result } = renderHook(() => useBackgroundTime());
      expect(result.current.seconds).toBe(0);
   });

   it('should increment seconds after time passes', () => {
      const { result } = renderHook(() => useBackgroundTime());

      act(() => {
         vi.advanceTimersByTime(3000); // simulate 3 seconds
      });

      expect(result.current.seconds).toBeGreaterThanOrEqual(3);
   });

   it('should pause when document is hidden and resume when visible', () => {
      const { result } = renderHook(() => useBackgroundTime());

      // Wait 2 seconds
      act(() => {
         vi.advanceTimersByTime(2000);
      });
      expect(result.current.seconds).toBeGreaterThanOrEqual(2);

      // Simulate page hidden
      act(() => {
         Object.defineProperty(document, 'visibilityState', {
            value: 'hidden',
            configurable: true,
         });
         document.dispatchEvent(new Event('visibilitychange'));
         vi.advanceTimersByTime(5000); // simulate 5 seconds
      });

      expect(result.current.seconds).toBeLessThan(7); // should not have advanced during hidden

      // Simulate page visible again
      act(() => {
         Object.defineProperty(document, 'visibilityState', {
            value: 'visible',
            configurable: true,
         });
         document.dispatchEvent(new Event('visibilitychange'));
         vi.advanceTimersByTime(2000);
      });

      expect(result.current.seconds).toBeGreaterThanOrEqual(4);
   });

   it('should clean up interval on unmount', () => {
      const clearSpy = vi.spyOn(global, 'clearInterval');
      const { unmount } = renderHook(() => useBackgroundTime());

      unmount();

      expect(clearSpy).toHaveBeenCalled();
      clearSpy.mockRestore();
   });
});
