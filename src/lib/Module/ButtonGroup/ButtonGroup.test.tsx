import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as ButtonGroupStories from './ButtonGroup.stories';
const { Template, Icon } = composeStories(ButtonGroupStories);

it('should render without crashing', () => {
   render(<Template />);
});

it('should render without crashing', () => {
   render(<Icon />);
});
