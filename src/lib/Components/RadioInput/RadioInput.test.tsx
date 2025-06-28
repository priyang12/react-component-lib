import { render, screen, fireEvent } from '@testing-library/react';
import RadioInput, { RadioInputProps } from './RadioInput';
import { vi } from 'vitest';

const inputChangeMock = vi.fn();
const onFocusMock = vi.fn();

vi.mock('../FormControl', async () => {
   return {
      useFormContext: () => ({
         isAlert: false,
         inputChange: inputChangeMock,
         onFocus: onFocusMock,
      }),
   };
});

const handleChangeMock = vi.fn();

vi.mock('../../Utils/AllFunctionsCall', () => ({
   callAll:
      (...fns: any[]) =>
      (...args: any[]) =>
         fns.forEach((fn) => fn?.(...args)),
}));

const renderRadio = (props: Partial<RadioInputProps> = {}) =>
   render(
      <RadioInput
         id="test-radio"
         name="test-group"
         value="test"
         renderLabel={() => <label htmlFor="test-radio">Test Label</label>}
         {...props}
      />
   );

describe('RadioInput', () => {
   beforeEach(() => {
      vi.clearAllMocks();
   });

   test('renders radio input and label', () => {
      renderRadio();

      const input = screen.getByRole('radio');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'radio');
      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
   });

   test('calls onChange and inputChange from context', () => {
      const onChange = vi.fn();

      renderRadio({ onChange });

      fireEvent.click(screen.getByRole('radio'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(inputChangeMock).toHaveBeenCalledTimes(2);
   });

   test('triggers click on Enter key', () => {
      const onChange = vi.fn();
      renderRadio({ onChange });

      const input = screen.getByRole('radio');
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

      expect(onChange).toHaveBeenCalled();
   });

   test('triggers click on Space key', () => {
      const onChange = vi.fn();
      renderRadio({ onChange });

      const input = screen.getByRole('radio');
      fireEvent.keyDown(input, { key: ' ', code: 'Space', charCode: 32 });

      expect(onChange).toHaveBeenCalled();
   });

   test('adds is-alert class when context.isAlert is true', () => {
      vi.mock('../FormControl', async () => {
         return {
            useFormContext: () => ({
               isAlert: true,
               inputChange: inputChangeMock,
               onFocus: onFocusMock,
            }),
         };
      });

      const { container } = renderRadio();
      expect(container.firstChild).toHaveClass('is-alert');
   });

   test.skip('is checked when selectedValue matches value from context', () => {
      // this is not mocking for some reason.
      vi.mock('../RadioGroup/RadioGroup', () => ({
         useRadioContext: () => ({
            name: 'radio-group',
            selectedValue: 'test',
            handleChange: handleChangeMock,
         }),
      }));
      renderRadio({ value: 'test' });

      const input = screen.getByRole('radio');
      expect(input).toBeChecked();
   });

   test('does not apply checked prop when selectedValue is undefined (uncontrolled)', () => {
      vi.mock('../RadioGroup/RadioGroup', () => ({
         useRadioContext: () => ({
            name: 'radio-group',
            selectedValue: undefined,
            handleChange: handleChangeMock,
         }),
      }));

      renderRadio({ value: 'other' });

      const input = screen.getByRole('radio');

      // Not checked and not controlled
      expect(input).not.toBeChecked();
   });
   test('assigns name from context to input', () => {
      renderRadio({ name: 'radio-group' });

      const input = screen.getByRole('radio');
      expect(input).toHaveAttribute('name', 'radio-group');
   });
});
