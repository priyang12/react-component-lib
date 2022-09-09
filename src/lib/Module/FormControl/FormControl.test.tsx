import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as FromControlStories from './FormControl.stories';
import { ReactElement, JSXElementConstructor } from 'react';

const { Template } = composeStories(FromControlStories);

function setup(jsx: ReactElement<any, string | JSXElementConstructor<any>>) {
   return {
      user: userEvent.setup(),
      ...render(jsx),
   };
}

it('should render without crashing', () => {
   setup(<Template />);
});

it('check for Alert message and color red', async () => {
   const { user } = setup(<Template />);

   const input = screen.getByLabelText('Search');

   await user.type(input, 'test');
   expect(input).toHaveValue('test');
   user.clear(input);
   expect(screen.getByText('value is required')).toBeInTheDocument();
   expect(input).toHaveClass('alert');
});
