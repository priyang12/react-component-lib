import { screen } from '@testing-library/react';
import { testA11y } from '../../Utils/test-utils/index';
import { composeStories } from '@storybook/testing-react';
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
   testA11y(<Default text="Button Name" />);
   expect(screen.getByText('Button Name')).toBeInTheDocument();
});

it('render Input with border variant', () => {
   testA11y(<BorderVariant />);
   expect(screen.getByRole('button').hasAttribute('class')).toBe(true);
});

it('render Input with border variant', () => {
   testA11y(<LoadingButton LoadingText="Loading Wait" />);
   expect(screen.getByRole('button')).toBeDisabled();
   expect(screen.getByRole('button').textContent).toMatch('Loading Wait');
});

it('render Input with long text', () => {
   testA11y(<LongText />);
   expect(
      screen.getByText('This is a very long text that should be truncated')
   ).toBeInTheDocument();
});

it('render Input with custom color variant', () => {
   testA11y(<CustomColorVariant />);
   expect(screen.getByRole('button').style.color).toBe('rgb(51, 51, 51)');
});

it('render Input with radius', () => {
   testA11y(<Radius />);
   expect(screen.getByRole('button').style.borderRadius).toBe('10px');
});

it('render Input with variant', () => {
   testA11y(<Variant variant="primary" />);
   expect(screen.getByRole('button').hasAttribute('class')).toBe(true);
});
