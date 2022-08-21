import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as TextAreaStories from './TextArea.stories';

const { Size, Template } = composeStories(TextAreaStories);

it('render TextArea', () => {
   render(<Template />);
});

it('render TextArea with size medium and alert', () => {
   render(<Size alert={true} />);
   expect(screen.getByRole('textbox').classList).toContain('Alert-Border');
});
