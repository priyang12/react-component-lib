import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as ProgressBarStories from './ProgressBar.stories';
const { Template } = composeStories(ProgressBarStories);

it('should render without crashing', () => {
   render(<Template min={0} max={100} value={50} />);
   expect(screen.getByText('50%')).toBeInTheDocument();
});
