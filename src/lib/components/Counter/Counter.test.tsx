import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';';
import * as CounterStories from './Counter.stories';
const { Template } = composeStories(CounterStories);

    it('should render without crashing', () => {
        render(<Template/>);
    });
