import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as InputStories from './Input.stories';

const { Size, Template } = composeStories(InputStories);

it('render Input', () => {
   render(<Template />);
});

it('render Input with size medium and alert', () => {
   render(<Size alert={true} />);
   expect(screen.getByRole('textbox').classList).toContain('alert');
});
