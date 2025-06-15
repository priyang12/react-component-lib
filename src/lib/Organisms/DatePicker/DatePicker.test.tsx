import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as DatePickerStories from './DatePicker.stories';
const { Template } = composeStories(DatePickerStories);

it('should render without crashing', () => {
   render(<Template />);
});
