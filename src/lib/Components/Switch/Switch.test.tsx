import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as SwitchStories from './Switch.stories';
import { FormControlContext } from '../FormControl/FormControl';

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

it('With FormContext', () => {
   render(
      <FormControlContext.Provider
         value={
            {
               disabled: true,
               isAlert: false,
            } as any
         }
      >
         <Template />
      </FormControlContext.Provider>
   );
   const switchInput = screen.getByTestId('switch-input') as HTMLInputElement;
   expect(switchInput).toBeDisabled();
   expect(switchInput.checked).toBe(false);
});
