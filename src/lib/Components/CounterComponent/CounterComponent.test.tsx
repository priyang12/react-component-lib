import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as CounterComponentStories from './CounterComponent.stories';
const { Template } = composeStories(CounterComponentStories);

it('should render without crashing', () => {
   render(<Template />);
});
