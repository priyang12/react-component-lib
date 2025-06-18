import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as VercelButtonStories from './VercelButton.stories';

const { VercelAnimation, BorderHover } = composeStories(VercelButtonStories);

it('render Input', () => {
   render(<VercelAnimation />);
});
it('render Input', () => {
   render(<BorderHover />);
});
