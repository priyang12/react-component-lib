import { render, screen } from '@testing-library/react';
import StatusDot from './StatusDot';

describe('StatusDot', () => {
   it('renders without crashing', () => {
      render(<StatusDot status="online" />);
      const dot = screen.getByRole('status');
      expect(dot).toBeInTheDocument();
   });

   it('applies correct status and size classes', () => {
      render(<StatusDot status="error" size="lg" />);
      const dot = screen.getByRole('status');
      expect(dot).toHaveClass(
         'status-dot',
         'status-dot--error',
         'status-dot--lg'
      );
   });

   it('defaults to medium size if not provided', () => {
      render(<StatusDot status="offline" />);
      const dot = screen.getByRole('status');
      expect(dot).toHaveClass('status-dot--md');
   });

   it('sets ARIA label based on `label` prop', () => {
      render(<StatusDot status="idle" label="User is idle" />);
      const dot = screen.getByLabelText('User is idle');
      expect(dot).toBeInTheDocument();
   });

   it('falls back to status value for ARIA label if `label` is not provided', () => {
      render(<StatusDot status="unknown" />);
      const dot = screen.getByLabelText('unknown');
      expect(dot).toBeInTheDocument();
   });
});
