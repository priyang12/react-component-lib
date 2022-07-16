import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as InputStories from './Input.stories';

const { Large, Medium, Template } = composeStories(InputStories);

it('render Input', () => {
   render(<Template />);
});

it('render Input with size large', () => {
   render(<Large />);
   expect(screen.getByRole('textbox').classList).toContain('large');
});

it('render Input with size medium and alert', () => {
   render(<Medium alert={true} />);
   expect(screen.getByRole('textbox').classList).toContain('alert');
});
