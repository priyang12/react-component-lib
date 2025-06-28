import { render, screen, fireEvent } from '@testing-library/react';
import { CounterControls } from './CounterComponent';

describe('CounterControls', () => {
   it('renders with default initial value of 0', () => {
      render(
         <CounterControls
            renderCounter={(_, count) => <span>Value: {count}</span>}
         />
      );
      expect(screen.getByText(/Value: 0/)).toBeInTheDocument();
   });

   it('respects the custom initial value', () => {
      render(
         <CounterControls
            initialValue={5}
            renderCounter={(_, count) => <span>Value: {count}</span>}
         />
      );
      expect(screen.getByText(/Value: 5/)).toBeInTheDocument();
   });

   it('increments the counter on "+" click', () => {
      render(
         <CounterControls
            initialValue={1}
            renderCounter={(_, count) => <span>Count: {count}</span>}
         />
      );
      const incrementButton = screen.getByRole('button', {
         name: /increment/i,
      });
      fireEvent.click(incrementButton);
      expect(screen.getByText(/Count: 2/)).toBeInTheDocument();
   });

   it('decrements the counter on "-" click', () => {
      render(
         <CounterControls
            initialValue={2}
            renderCounter={(_, count) => <span>Count: {count}</span>}
         />
      );
      const decrementButton = screen.getByRole('button', {
         name: /decrement/i,
      });
      fireEvent.click(decrementButton);
      expect(screen.getByText(/Count: 1/)).toBeInTheDocument();
   });

   it('does not go below minimum value of 0', () => {
      render(
         <CounterControls
            initialValue={0}
            renderCounter={(_, count) => <span>Count: {count}</span>}
         />
      );
      const decrementButton = screen.getByRole('button', {
         name: /decrement/i,
      });
      fireEvent.click(decrementButton);
      expect(screen.getByText(/Count: 0/)).toBeInTheDocument();
   });

   it('applies aria-live and accessibility attributes', () => {
      render(
         <CounterControls
            renderCounter={(_, count) => <span>Value: {count}</span>}
         />
      );
      const region = screen.getByRole('region');
      expect(region).toHaveAttribute('aria-live', 'polite');
      expect(region).toHaveAttribute('aria-labelledby', 'counter-label');
   });
});
