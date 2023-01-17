import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as MenuItemStories from './MenuItem.stories';
const { Template } = composeStories(MenuItemStories);

    it('should render without crashing', () => {
        render(<Template/>);
    });
