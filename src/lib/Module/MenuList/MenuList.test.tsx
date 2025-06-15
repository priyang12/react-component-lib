import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as MenuListStories from './MenuList.stories';
const { Template } = composeStories(MenuListStories);

it('should render without crashing', () => {
   render(<Template />);
});
