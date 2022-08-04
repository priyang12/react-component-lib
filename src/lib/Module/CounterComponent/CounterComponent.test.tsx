import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';';
import * as CounterComponentStories from './CounterComponent.stories';
const { Template } = composeStories(CounterComponentStories);

    it('should render without crashing', () => {
        render(<Template/>);
    });
