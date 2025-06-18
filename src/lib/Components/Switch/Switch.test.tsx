import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as SwitchStories from './Switch.stories';

const { Template } = composeStories(SwitchStories);

it('should render without crashing', () => {
   render(<Template />);
   const switchLabel = screen.getByLabelText(
      'switch-label'
   ) as HTMLInputElement;

   expect(switchLabel.checked).toBe(false);
   fireEvent.click(switchLabel);
   expect(switchLabel.checked).toBe(true);
});
