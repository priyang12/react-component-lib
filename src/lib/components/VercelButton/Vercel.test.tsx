import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as VercelButtonStories from './VercelButton.stories';

const { Default } = composeStories(VercelButtonStories);

it('render Input', () => {
   render(<Default />);
});
