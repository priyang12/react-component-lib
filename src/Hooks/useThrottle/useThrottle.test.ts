import { renderHook } from '@testing-library/react';
import { useThrottle } from './useThrottle';

describe('useThrottle', () => {
   beforeEach(() => {
      vi.useFakeTimers();
   });

   afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
   });

   it('should return initial value immediately', () => {
      const { result } = renderHook(() => useThrottle('hello', 500));
      expect(result.current).toBe('hello');
   });

   it('should cleanup timeout on unmount', () => {
      const clearSpy = vi.spyOn(global, 'clearTimeout');
      const { unmount } = renderHook(() => useThrottle('value', 500));

      unmount();
      expect(clearSpy).toHaveBeenCalled();
   });
});
