import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as ButtonStories from './Button.stories';

const { Default, LongText, Variant, LoadingButton, Icon } =
   composeStories(ButtonStories);

describe('Button component (via Storybook)', () => {
   it('renders the default button', () => {
      render(<Default />);
      expect(screen.getByRole('button')).toHaveTextContent(
         Default.args?.text || ''
      );
   });

   it('renders long text with ellipsis if enabled', () => {
      render(<LongText />);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent(LongText.args?.text || '');
      expect(button.className).toMatch(/ellipsis/i);
   });

   it('renders the loading button with loading text', () => {
      render(<LoadingButton />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent(
         LoadingButton.args?.LoadingText || 'Loading...'
      );
   });

   it('applies custom variant classes', () => {
      render(<Variant />);
      const button = screen.getByRole('button');
      expect(button.className).toMatch(/Button-(primary|secondary|danger)/);
   });

   it('renders icon when passed', () => {
      render(<Icon />);
      const icon = screen.getByRole('icon');
      expect(icon).toBeInTheDocument();
   });

   it('fires onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Default onClick={handleClick} />);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalled();
   });
});
