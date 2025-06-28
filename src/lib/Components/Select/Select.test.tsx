import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

const mockOptions = [
   { label: 'JavaScript', value: 'js' },
   { label: 'Python', value: 'py' },
];

const renderLabel = ({ selectedValue }: { selectedValue: string }) => (
   <label htmlFor="lang-input">Select: {selectedValue}</label>
);

const renderOptions = ({ filteredOptions, selectValue }: any) => (
   <ul>
      {filteredOptions.map((opt: any) => (
         <li
            key={opt.value}
            data-testid={`option-${opt.value}`}
            onClick={() => selectValue(opt.value)}
         >
            {opt.label}
         </li>
      ))}
   </ul>
);

describe('Select component', () => {
   it('renders with default selected value', () => {
      render(
         <Select
            name="lang"
            inputSize="medium"
            initialValue="js"
            options={mockOptions}
            renderLabel={renderLabel}
            renderOptions={renderOptions}
         />
      );
      expect(screen.getByLabelText(/Select: js/i)).toBeInTheDocument();
   });

   it('opens options dropdown on click', () => {
      render(
         <Select
            name="lang"
            inputSize="medium"
            initialValue="js"
            options={mockOptions}
            renderLabel={renderLabel}
            renderOptions={renderOptions}
         />
      );

      fireEvent.click(screen.getByRole('textbox')); // Clicking on Input
      expect(screen.getByTestId('option-js')).toBeInTheDocument();
      expect(screen.getByTestId('option-py')).toBeInTheDocument();
   });

   it('selects an option from dropdown', () => {
      render(
         <Select
            name="lang"
            inputSize="medium"
            initialValue="js"
            options={mockOptions}
            renderLabel={renderLabel}
            renderOptions={renderOptions}
         />
      );

      fireEvent.click(screen.getByRole('textbox'));
      fireEvent.click(screen.getByTestId('option-py'));
      expect(screen.getByLabelText(/Select: py/i)).toBeInTheDocument();
   });

   it('closes dropdown on outside click', () => {
      const { getByRole, queryByTestId } = render(
         <div>
            <Select
               name="lang"
               inputSize="medium"
               initialValue="js"
               options={mockOptions}
               renderLabel={renderLabel}
               renderOptions={renderOptions}
            />
            <button data-testid="outside-button">Click me</button>
         </div>
      );

      fireEvent.click(getByRole('textbox'));
      expect(screen.getByTestId('option-js')).toBeInTheDocument();

      fireEvent.mouseDown(screen.getByTestId('outside-button')); // simulate outside click
      expect(queryByTestId('option-js')).not.toBeInTheDocument();
   });
});
