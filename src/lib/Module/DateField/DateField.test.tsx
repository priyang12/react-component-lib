import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as DateFieldStories from './DateField.stories';
const { Template } = composeStories(DateFieldStories);

it('should render without crashing', () => {
   render(<Template />);
});
