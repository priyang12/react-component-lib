import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckBox from './CheckBox';

describe('CheckBox', () => {
   it('renders without crashing', () => {
      render(<CheckBox />);
   });

   it('renders a checkbox input element', () => {
      render(<CheckBox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
   });

   it('toggles when clicked (uncontrolled)', async () => {
      render(<CheckBox checked={false} />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();

      await userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
   });
});
