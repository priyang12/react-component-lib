import { render, fireEvent } from '@testing-library/react';
import Input from './Input';
import { vi } from 'vitest';
import * as FormControl from '../FormControl/FormControl';

describe('Input', () => {
   const mockContext = {
      alert: false,
      isAlert: false,
      disabled: false,
      LabelCheck: false,
      overlay: false,
      inputChange: vi.fn(),
      onFocus: vi.fn(),
   } as any;

   beforeEach(() => {
      vi.spyOn(FormControl, 'useFormContext').mockReturnValue(mockContext);
   });

   afterEach(() => {
      vi.restoreAllMocks();
   });

   it('renders with default medium size class', () => {
      const { getByPlaceholderText } = render(
         <Input InputSize="medium" placeholder="Test input" />
      );
      const input = getByPlaceholderText('Test input');
      expect(input).toHaveClass('input', 'input-medium');
   });

   it('applies size classes correctly', () => {
      const { getByPlaceholderText } = render(
         <Input InputSize="large" placeholder="Large input" />
      );
      expect(getByPlaceholderText('Large input')).toHaveClass('input-large');
   });

   it.skip('applies alert class when alert is true in context', () => {
      vi.spyOn(FormControl, 'useFormContext').mockReturnValue({
         ...mockContext,
         alert: true,
      });

      const { getByRole } = render(<Input InputSize="small" />);
      expect(getByRole('textbox')).toHaveClass('alert');
   });

   it('calls context inputChange and onFocus handlers', () => {
      const { getByRole } = render(<Input InputSize="medium" />);
      const input = getByRole('textbox');

      fireEvent.change(input, { target: { value: 'hello' } });
      fireEvent.focus(input);

      expect(mockContext.inputChange).toHaveBeenCalled();
      expect(mockContext.onFocus).toHaveBeenCalled();
   });

   it('calls both internal and context change/focus handlers', () => {
      const internalChange = vi.fn();
      const internalFocus = vi.fn();

      const { getByRole } = render(
         <Input
            InputSize="medium"
            onChange={internalChange}
            onFocus={internalFocus}
         />
      );
      const input = getByRole('textbox');

      fireEvent.change(input, { target: { value: 'hello' } });
      fireEvent.focus(input);

      expect(internalChange).toHaveBeenCalled();
      expect(internalFocus).toHaveBeenCalled();
      expect(mockContext.inputChange).toHaveBeenCalled();
      expect(mockContext.onFocus).toHaveBeenCalled();
   });
});
