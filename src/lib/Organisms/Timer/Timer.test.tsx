import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as TimerStories from './Timer.stories';

const { Template, CounterHidden } = composeStories(TimerStories);

it('should render without crashing', () => {
   render(<Template />);
});

it('should render the correct time', () => {
   render(<CounterHidden />);
   expect(screen.queryByText(/sec/)).not.toBeInTheDocument();
});
