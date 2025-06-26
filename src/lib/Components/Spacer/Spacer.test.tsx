import { render, screen } from '@testing-library/react';
import Spacer from './Spacer';

describe('Spacer', () => {
   it('renders without crashing', () => {
      render(<Spacer />);
      const spacer = screen.getByRole('presentation', { hidden: true });
      expect(spacer).toBeInTheDocument();
   });

   it('has default vertical direction and medium size', () => {
      render(<Spacer />);
      const spacer = screen.getByRole('presentation', { hidden: true });
      expect(spacer).toHaveClass('spacer', 'spacer--vertical', 'spacer--md');
   });

   it('applies given size and direction classes', () => {
      render(<Spacer size="lg" direction="horizontal" />);
      const spacer = screen.getByRole('presentation', { hidden: true });
      expect(spacer).toHaveClass('spacer--horizontal', 'spacer--lg');
   });
});
