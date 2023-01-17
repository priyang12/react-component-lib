import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as MenuItemStories from './MenuItem.stories';
const { Template, Command, WithIcon } = composeStories(MenuItemStories);

describe('MenuItem', () => {
   it('renders the component with the correct className', () => {
      const { container } = render(<Template className="custom-class" />);
      const menuItem = container.querySelector('.MenuItem');
      expect(menuItem).toHaveClass('custom-class');
   });

   it('renders the icon when passed in', () => {
      const { container } = render(<WithIcon />);
      const icon = container.querySelector('.Icon');
      expect(icon).toBeInTheDocument();
   });

   it('renders the command when passed in', () => {
      const { container } = render(<Command />);
      const command = container.querySelector('.command');
      expect(command).toHaveTextContent('⌘N');
   });
});
