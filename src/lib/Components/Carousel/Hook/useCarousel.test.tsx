import { renderHook } from '@testing-library/react';
import { useCarousel } from './useCarousel';
import { act } from 'react';

// need to add reducer test cases.

describe('useCarousel hook', () => {
   it('initializes with correct state', () => {
      const { result } = renderHook(() =>
         useCarousel({ carouselLength: 5, currentIndex: 2, loop: false })
      );
      expect(result.current.state.currentIndex).toBe(2);
   });

   it('goes to next slide', () => {
      const { result } = renderHook(() =>
         useCarousel({ carouselLength: 5, currentIndex: 1, loop: false })
      );
      act(() => result.current.nextSlide());
      expect(result.current.state.currentIndex).toBe(2);
   });

   it('stays at last slide if loop is false', () => {
      const { result } = renderHook(() =>
         useCarousel({ carouselLength: 3, currentIndex: 2, loop: false })
      );
      act(() => result.current.nextSlide());
      expect(result.current.state.currentIndex).toBe(2);
   });

   it('loops to first slide if loop is true and on last slide', () => {
      const { result } = renderHook(() =>
         useCarousel({ carouselLength: 3, currentIndex: 2, loop: true })
      );
      act(() => result.current.nextSlide());
      expect(result.current.state.currentIndex).toBe(0);
   });

   it('goes to previous slide', () => {
      const { result } = renderHook(() =>
         useCarousel({ carouselLength: 3, currentIndex: 1, loop: false })
      );
      act(() => result.current.prevSlide());
      expect(result.current.state.currentIndex).toBe(0);
   });

   it('loops to last slide from first if loop is true', () => {
      const { result } = renderHook(() =>
         useCarousel({ carouselLength: 4, currentIndex: 0, loop: true })
      );
      act(() => result.current.prevSlide());
      expect(result.current.state.currentIndex).toBe(3);
   });

   it('auto-advances slides with autoplay', async () => {
      vi.useFakeTimers();
      const { result } = renderHook(() =>
         useCarousel({
            carouselLength: 5,
            currentIndex: 0,
            loop: true,
            autoplay: { delay: 1000 },
         })
      );

      act(() => {
         vi.advanceTimersByTime(1000);
      });

      expect(result.current.state.currentIndex).toBe(1);

      act(() => {
         vi.advanceTimersByTime(1000);
      });

      expect(result.current.state.currentIndex).toBe(2);

      vi.useRealTimers();
   });
});
