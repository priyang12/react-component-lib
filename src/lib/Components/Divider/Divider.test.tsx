import { render, screen } from '@testing-library/react';
import Divider from './Divider';

describe('Divider', () => {
   it('renders without crashing', () => {
      render(<Divider />);
      const divider = screen.getByRole('separator');
      expect(divider).toBeInTheDocument();
   });

   it('applies default horizontal alignment', () => {
      render(<Divider />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('divider', 'divider--horizontal');
      expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
   });

   it('applies vertical alignment when specified', () => {
      render(<Divider align="vertical" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('divider--vertical');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
   });

   it('renders children inside a span with correct class', () => {
      render(<Divider>Section</Divider>);
      const text = screen.getByText('Section');
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass('divider-text');
   });
});
