import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as ImageMagnifierStories from './ImageMagnifier.stories';
const { Template } = composeStories(ImageMagnifierStories);

it('should render without crashing', () => {
   render(<Template />);
});
