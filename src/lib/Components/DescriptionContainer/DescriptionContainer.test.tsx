import { act } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DescriptionContainer from './DescriptionContainer';
import { vi } from 'vitest';

describe('<DescriptionContainer />', () => {
   beforeEach(() => {
      vi.useFakeTimers();
   });

   afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
   });

   it('renders children and description', () => {
      render(
         <DescriptionContainer
            renderDescription={() => <p data-testid="desc">Hello</p>}
         >
            {({ onMouseOver }) => (
               <button onMouseOver={onMouseOver}>Trigger</button>
            )}
         </DescriptionContainer>
      );

      expect(screen.getByText('Trigger')).toBeInTheDocument();
      // Description is hidden by default
      expect(screen.getByTestId('desc').parentElement).toHaveClass('hide');
   });

   it('shows description on hover', () => {
      render(
         <DescriptionContainer
            renderDescription={() => <p data-testid="desc">Hovered content</p>}
         >
            {({ onMouseOver }) => (
               <button onMouseOver={onMouseOver}>Trigger</button>
            )}
         </DescriptionContainer>
      );

      const trigger = screen.getByText('Trigger');
      act(() => {
         fireEvent.mouseOver(trigger);
      });

      expect(screen.getByTestId('desc')).toBeVisible();
   });

   it('hides the description after delay on mouse leave', () => {
      render(
         <DescriptionContainer
            renderDescription={() => <p data-testid="desc">Goodbye</p>}
         >
            {({ onMouseOver }) => <div onMouseOver={onMouseOver}>Trigger</div>}
         </DescriptionContainer>
      );

      const trigger = screen.getByText('Trigger');

      act(() => {
         fireEvent.mouseOver(trigger);
      });
      expect(screen.getByTestId('desc')).toBeVisible();

      act(() => {
         fireEvent.mouseLeave(screen.getByText('Trigger').parentElement!);
      });

      // still visible before timer runs out
      expect(screen.getByTestId('desc')).toBeVisible();

      // wait for timeout
      act(() => {
         vi.advanceTimersByTime(1000);
      });

      // now hidden
      expect(screen.getByTestId('desc').parentElement).toHaveClass('hide');
   });

   it('calls exitFunction on mouse leave', () => {
      const exitFn = vi.fn();

      render(
         <DescriptionContainer
            exitFunction={exitFn}
            renderDescription={() => <p data-testid="desc">Bye</p>}
         >
            {({ onMouseOver }) => <div onMouseOver={onMouseOver}>Trigger</div>}
         </DescriptionContainer>
      );

      act(() => {
         fireEvent.mouseOver(screen.getByText('Trigger'));
         fireEvent.mouseLeave(screen.getByText('Trigger').parentElement!);
      });

      expect(exitFn).toHaveBeenCalled();
   });

   it('respects defaultShow = true', () => {
      render(
         <DescriptionContainer
            defaultShow
            renderDescription={() => <p data-testid="desc">Default shown</p>}
         >
            {() => <div>Trigger</div>}
         </DescriptionContainer>
      );

      expect(screen.getByTestId('desc')).toBeVisible();
   });
});
