import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as SelectStories from './Select.stories';
const { Template } = composeStories(SelectStories);

    it('should render without crashing', () => {
        render(<Template/>);
    });
