import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as CalendarStories from './Calendar.stories';
const { Template } = composeStories(CalendarStories);

    it('should render without crashing', () => {
        render(<Template/>);
    });
