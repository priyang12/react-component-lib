import { render, screen } from '@testing-library/react';
import Truncate from './Truncate';
import { describe, it, expect } from 'vitest';

describe('Truncate', () => {
   it('renders the children text', () => {
      render(<Truncate>This is truncated text</Truncate>);
      expect(screen.getByText('This is truncated text')).toBeInTheDocument();
   });

   it('applies the tooltip title by default', () => {
      render(<Truncate>This is tooltip text</Truncate>);
      const element = screen.getByText('This is tooltip text');
      expect(element).toHaveAttribute('title', 'This is tooltip text');
   });

   it('sets the correct CSS variable for line clamp', () => {
      render(<Truncate lines={3}>Line clamped text</Truncate>);
      const element = screen.getByText('Line clamped text');
      expect(element.style.getPropertyValue('--truncate-lines')).toBe('3');
   });

   it('handles non-string children without tooltip', () => {
      render(
         <Truncate>
            <strong>Bold child</strong>
         </Truncate>
      );
      const element = screen.getByText('Bold child');
      expect(element).not.toHaveAttribute('title');
   });
});
