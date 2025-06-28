import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';
import ProgressBarLabel from './ProgressBarLabel';

describe('ProgressBar', () => {
   it('renders the correct children inside the progress bar', () => {
      render(
         <ProgressBar value={30} min={0} max={100}>
            30%
         </ProgressBar>
      );
      expect(screen.getByText('30%')).toBeInTheDocument();
   });
   it('renders the ProgressLabel inside the progress bar', () => {
      render(
         <ProgressBar value={30} min={0} max={100}>
            <ProgressBarLabel progressLabelText={'30%'} />
         </ProgressBar>
      );
      expect(screen.getByText('30%')).toBeInTheDocument();
   });

   it('applies the correct width based on progress value', () => {
      const { container } = render(
         <ProgressBar value={50} min={0} max={100}>
            Halfway
         </ProgressBar>
      );

      const progressBar = container.querySelector(
         '.progress-bar'
      ) as HTMLElement;
      expect(progressBar.style.width).toBe('50%');
   });

   it('clamps values below min to 0%', () => {
      const { container } = render(
         <ProgressBar value={-20} min={0} max={100}>
            Too Low
         </ProgressBar>
      );

      const progressBar = container.querySelector(
         '.progress-bar'
      ) as HTMLElement;
      expect(progressBar.style.width).toBe('0%');
   });

   it('clamps values above max to 100%', () => {
      const { container } = render(
         <ProgressBar value={120} min={0} max={100}>
            Too High
         </ProgressBar>
      );

      const progressBar = container.querySelector(
         '.progress-bar'
      ) as HTMLElement;
      expect(progressBar.style.width).toBe('100%');
   });

   it('applies the correct variant class', () => {
      const { container } = render(
         <ProgressBar value={60} min={0} max={100} variant="success">
            60%
         </ProgressBar>
      );

      const progressBar = container.querySelector('.progress-bar');
      expect(progressBar?.classList.contains('success-bar')).toBe(true);
   });

   it('sets correct accessibility attributes', () => {
      render(
         <ProgressBar value={40} min={0} max={100}>
            40%
         </ProgressBar>
      );

      const container = screen.getByRole('progressbar');
      expect(container).toHaveAttribute('aria-valuenow', '40');
      expect(container).toHaveAttribute('aria-valuemin', '0');
      expect(container).toHaveAttribute('aria-valuemax', '100');
   });
});
