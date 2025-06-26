import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
   it('renders without crashing', () => {
      render(<Loader />);
      const loader = screen.getByRole('presentation', { hidden: true });
      expect(loader).toBeInTheDocument();
   });

   it('renders the default spinner type and medium size by default', () => {
      render(<Loader />);
      const loader = screen.getByRole('presentation', { hidden: true });
      const spinner = loader.querySelector('.spinner-default');

      expect(loader).toHaveClass('loader', 'medium');
      expect(spinner).toBeInTheDocument();
   });

   it('applies the correct spinner type when specified', () => {
      render(<Loader loadingType="ripple" />);
      const spinner = screen
         .getByRole('presentation', { hidden: true })
         .querySelector('.spinner-ripple');
      expect(spinner).toBeInTheDocument();
   });

   it('applies the correct size class when specified', () => {
      render(<Loader size="large" />);
      const loader = screen.getByRole('presentation', { hidden: true });
      expect(loader).toHaveClass('large');
   });

   it('renders loadingText when provided', () => {
      render(<Loader loadingText="Loading data..." />);
      const text = screen.getByText('Loading data...');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('loading-text');
   });

   it('renders only spinner when loadingText is not provided', () => {
      render(<Loader />);
      const text = screen.queryByText(/loading/i);
      expect(text).not.toBeInTheDocument();
   });
});
