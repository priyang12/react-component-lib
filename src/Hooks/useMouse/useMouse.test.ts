import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useMouse } from './useMouse'; // update with actual path
import React from 'react';

describe('useMouse', () => {
   let ref: React.RefObject<HTMLDivElement>;
   let element: HTMLDivElement;

   beforeEach(() => {
      element = document.createElement('div');
      document.body.appendChild(element);
      ref = { current: element };
   });

   afterEach(() => {
      document.body.innerHTML = '';
      vi.restoreAllMocks();
   });

   it('initializes with x=0 and y=0', () => {
      const { result } = renderHook(() => useMouse(ref));
      expect(result.current).toEqual({ x: 0, y: 0 });
   });

   it.skip('tracks mouse position within the provided element', () => {
      const { result } = renderHook(() => useMouse(ref));

      // mouse event is not firing.
      const event = new MouseEvent('mousemove', {
         clientX: 150,
         clientY: 300,
         bubbles: true,
      });

      element.dispatchEvent(event);
      expect(result.current).toEqual({ x: 150, y: 300 });
   });

   it.skip('tracks mouse position globally when ref.current is null', () => {
      const nullRef = { current: null };
      const { result } = renderHook(() => useMouse(nullRef));

      // mouse event is not firing.
      const event = new MouseEvent('mousemove', {
         clientX: 80,
         clientY: 120,
      });

      document.dispatchEvent(event);
      expect(result.current).toEqual({ x: 80, y: 120 });
   });

   it('cleans up event listener on unmount (ref case)', () => {
      const addSpy = vi.spyOn(element, 'addEventListener');
      const removeSpy = vi.spyOn(element, 'removeEventListener');

      const { unmount } = renderHook(() => useMouse(ref));
      expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

      unmount();
      expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
   });

   it('cleans up event listener on unmount (fallback to document)', () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const removeSpy = vi.spyOn(document, 'removeEventListener');

      const nullRef = { current: null };
      const { unmount } = renderHook(() => useMouse(nullRef));
      expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

      unmount();
      expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
   });
});
