import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as SwitchStories from './Switch.stories';

const { Template, Disabled } = composeStories(SwitchStories);

it('should render without crashing', () => {
   render(<Template />);
});

it('Switch State', () => {
   render(<Template />);
   const switchInput = screen.getByTestId('switch-input') as HTMLInputElement;
   expect(switchInput.checked).toBe(false);
   fireEvent.click(switchInput);
   expect(switchInput.checked).toBe(true);
});

it('Disabled Switch state', () => {
   render(<Disabled />);
   const switchInput = screen.getByTestId('switch-input') as HTMLInputElement;
   expect(switchInput).toBeDisabled();
   expect(switchInput.checked).toBe(false);
});
