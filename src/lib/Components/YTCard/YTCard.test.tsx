import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as HoverCardStories from './YTCard.stories';
const { Template } = composeStories(HoverCardStories);

it('should render without crashing', () => {
   render(<Template />);
});
