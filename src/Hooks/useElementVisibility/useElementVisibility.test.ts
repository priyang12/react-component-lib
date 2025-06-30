import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useElementVisibility } from './useElementVisibility'; // update the path

let observe: any;
let unobserve: any;
let disconnect: any;

beforeEach(() => {
   observe = vi.fn();
   unobserve = vi.fn();
   disconnect = vi.fn();

   class MockIntersectionObserver {
      constructor(callback: any, options: any) {
         (MockIntersectionObserver as any).callback = callback;
         (MockIntersectionObserver as any).options = options;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
   }

   Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
   });
});

afterEach(() => {
   vi.clearAllMocks();
});

describe('useElementVisibility', () => {
   it('should initialize with false', () => {
      const ref = { current: document.createElement('div') };

      const { result } = renderHook(() => useElementVisibility(ref));

      expect(result.current).toBe(false);
   });

   it('should call observer and update visibility when intersecting', () => {
      const ref = { current: document.createElement('div') };

      const { result } = renderHook(() => useElementVisibility(ref));

      const mockEntry = { isIntersecting: true };

      act(() => {
         (window.IntersectionObserver as any).callback([mockEntry]);
      });

      expect(result.current).toBe(true);
   });

   it('should update to false when not intersecting', () => {
      const ref = { current: document.createElement('div') };

      const { result } = renderHook(() => useElementVisibility(ref));

      const mockEntryVisible = { isIntersecting: true };
      const mockEntryHidden = { isIntersecting: false };

      act(() => {
         (window.IntersectionObserver as any).callback([mockEntryVisible]);
      });
      expect(result.current).toBe(true);

      act(() => {
         (window.IntersectionObserver as any).callback([mockEntryHidden]);
      });
      expect(result.current).toBe(false);
   });

   it('should disconnect observer on unmount', () => {
      const ref = { current: document.createElement('div') };

      const { unmount } = renderHook(() => useElementVisibility(ref));

      unmount();

      expect(disconnect).toHaveBeenCalled();
   });

   it('should not create observer if ref.current is null', () => {
      const ref = { current: null };

      renderHook(() => useElementVisibility(ref));

      expect(observe).not.toHaveBeenCalled();
   });
});
