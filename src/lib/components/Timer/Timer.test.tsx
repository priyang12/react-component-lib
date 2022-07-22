import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';';
import * as TimerStories from './Timer.stories';
const { Template } = composeStories(TimerStories);

    it('should render without crashing', () => {
        render(<Template/>);
    });
