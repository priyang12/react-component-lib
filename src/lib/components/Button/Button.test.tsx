import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as InputStories from './Button.stories';

const { Default } = composeStories(InputStories);

it('render Input', () => {
   render(<Default />);
});
