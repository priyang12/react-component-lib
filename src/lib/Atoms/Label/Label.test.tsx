import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as LabelStories from './Label.stories';

const { Template } = composeStories(LabelStories);

it('render Input', () => {
   render(<Template />);
});
