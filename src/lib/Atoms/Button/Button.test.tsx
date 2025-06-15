import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as ButtonStories from './Button.stories';

const {
   Default,
   BorderVariant,
   LongText,
   CustomColorVariant,
   Radius,
   Variant,
   LoadingButton,
} = composeStories(ButtonStories);

it('render Input with text', () => {
   render(<Default text="Button Name" />);
   expect(screen.getByText('Button Name')).toBeInTheDocument();
});

it('render Input with border variant', () => {
   render(<BorderVariant />);
   expect(screen.getByRole('button').hasAttribute('class')).toBe(true);
});

it('render Input with border variant', () => {
   render(<LoadingButton LoadingText="Loading Wait" />);
   expect(screen.getByRole('button')).toBeDisabled();
   expect(screen.getByRole('button').textContent).toMatch('Loading Wait');
});

it('render Input with long text', () => {
   render(<LongText />);
   expect(
      screen.getByText('This is a very long text that should be truncated')
   ).toBeInTheDocument();
});

it('render Input with custom color variant', () => {
   render(<CustomColorVariant />);
   expect(screen.getByRole('button').style.color).toBe('rgb(51, 51, 51)');
});

it('render Input with radius', () => {
   render(<Radius />);
   expect(screen.getByRole('button').style.borderRadius).toBe('10px');
});

it('render Input with variant', () => {
   render(<Variant variant="primary" />);
   expect(screen.getByRole('button').hasAttribute('class')).toBe(true);
});
