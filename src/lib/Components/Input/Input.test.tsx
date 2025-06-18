import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as InputStories from './Input.stories';

const { Size, Template } = composeStories(InputStories);

it('render Input', () => {
   render(<Template />);
});

it('render Input with size medium and alert', () => {
   render(<Size InputSize="large" />);
   expect(screen.getByRole('textbox').className).toContain('large');
});
