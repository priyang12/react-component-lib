import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as ButtonGroupStories from './ButtonGroup.stories';
const { Template } = composeStories(ButtonGroupStories);

it('should render without crashing', () => {
   render(<Template />);
});
