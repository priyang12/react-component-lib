import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as HoverCardStories from './HoverCard.stories';
const { Template } = composeStories(HoverCardStories);

it('should render without crashing', () => {
   render(<Template />);
});
