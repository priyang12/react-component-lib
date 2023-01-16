import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as NavbarStories from './Navbar.stories';
const { Template } = composeStories(NavbarStories);

    it('should render without crashing', () => {
        render(<Template/>);
    });
