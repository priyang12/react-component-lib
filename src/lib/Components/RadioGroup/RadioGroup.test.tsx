import { render, screen, fireEvent } from '@testing-library/react';
import { useRadioContext } from '../RadioGroup/RadioGroup';
import RadioGroup from './RadioGroup';
import { vi } from 'vitest';

export const MockRadioInput = ({ value }: { value: string }) => {
   const { name, selectedValue, handleChange } = useRadioContext();

   return (
      <label>
         <input
            type="radio"
            name={name}
            value={value}
            checked={selectedValue === value}
            onChange={handleChange}
         />
         {value}
      </label>
   );
};

describe('<RadioGroup />', () => {
   test('renders children', () => {
      render(
         <RadioGroup>
            <div>Child A</div>
            <div>Child B</div>
         </RadioGroup>
      );

      expect(screen.getByText('Child A')).toBeInTheDocument();
      expect(screen.getByText('Child B')).toBeInTheDocument();
   });

   test('sets default selected value', () => {
      render(
         <RadioGroup defaultValue="option1" name="test-group">
            <MockRadioInput value="option1" />
            <MockRadioInput value="option2" />
         </RadioGroup>
      );

      const radio1 = screen.getByDisplayValue('option1');
      const radio2 = screen.getByDisplayValue('option2');

      expect(radio1).toBeChecked();
      expect(radio2).not.toBeChecked();
   });

   test('updates selected value on change', () => {
      render(
         <RadioGroup defaultValue="option1" name="test-group">
            <MockRadioInput value="option1" />
            <MockRadioInput value="option2" />
         </RadioGroup>
      );

      const radio2 = screen.getByDisplayValue('option2');
      fireEvent.click(radio2);

      expect(radio2).toBeChecked();
   });

   test('calls handleRadioChange when value changes', () => {
      const handleRadioChange = vi.fn();

      render(
         <RadioGroup
            defaultValue="option1"
            name="test-group"
            handleRadioChange={handleRadioChange}
         >
            <MockRadioInput value="option1" />
            <MockRadioInput value="option2" />
         </RadioGroup>
      );

      fireEvent.click(screen.getByDisplayValue('option2'));
      expect(handleRadioChange).toHaveBeenCalledWith('option2');
   });

   test('passes name to inputs via context', () => {
      render(
         <RadioGroup defaultValue="a" name="shared-group">
            <MockRadioInput value="a" />
            <MockRadioInput value="b" />
         </RadioGroup>
      );

      const radio = screen.getByDisplayValue('a');
      expect(radio).toHaveAttribute('name', 'shared-group');
   });
});
