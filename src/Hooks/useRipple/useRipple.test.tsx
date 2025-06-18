import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useRipple } from './useRipple';

function TestComponent(props: {
   ripple?: { show: boolean; bgColor?: string };
}) {
   const { ref, createRipple } = useRipple(props.ripple);

   return (
      <button ref={ref} data-testid="btn" onClick={createRipple}>
         Click me
      </button>
   );
}

describe('useRipple', () => {
   it('does not create ripple if show is false', () => {
      const { getByTestId, container } = render(
         <TestComponent ripple={{ show: false }} />
      );
      const button = getByTestId('btn');
      fireEvent.click(button);
      expect(container.querySelector('.ripple')).toBeNull();
   });

   it('creates ripple on click if show is true', () => {
      const { getByTestId, container } = render(
         <TestComponent ripple={{ show: true }} />
      );
      const button = getByTestId('btn');
      fireEvent.click(button);
      expect(container.querySelector('.ripple')).not.toBeNull();
   });

   it('sets custom ripple color via CSS variable', () => {
      const { getByTestId, container } = render(
         <TestComponent ripple={{ show: true, bgColor: 'red' }} />
      );
      const button = getByTestId('btn');
      fireEvent.click(button);
      const ripple = container.querySelector('.ripple') as HTMLSpanElement;
      expect(ripple.style.getPropertyValue('--ripple-color')).toBe('red');
   });

   it('cleans up ripple after duration', async () => {
      vi.useFakeTimers();
      const { getByTestId, container } = render(
         <TestComponent ripple={{ show: true }} />
      );
      const button = getByTestId('btn');
      fireEvent.click(button);

      expect(container.querySelector('.ripple')).not.toBeNull();

      vi.advanceTimersByTime(500);
      expect(container.querySelector('.ripple')).toBeNull();
   });
});
