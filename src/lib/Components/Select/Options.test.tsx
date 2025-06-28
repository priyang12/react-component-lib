import { render, screen, fireEvent } from '@testing-library/react';
import Options from './Options';

const mockOptions = [
   { label: 'JavaScript', value: 'js' },
   { label: 'Python', value: 'py' },
];

describe('Options component', () => {
   const toggleMock = vi.fn();
   const selectValueMock = vi.fn();
   const setFocusedIndexMock = vi.fn();

   beforeEach(() => {
      toggleMock.mockClear();
      selectValueMock.mockClear();
      setFocusedIndexMock.mockClear();
   });

   it('renders all filtered options', () => {
      render(
         <Options
            filteredOptions={mockOptions}
            selectedOption={undefined}
            focusedIndex={-1}
            toggle={toggleMock}
            selectValue={selectValueMock}
            setFocusedIndex={setFocusedIndexMock}
         />
      );

      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Python')).toBeInTheDocument();
   });

   it('calls select and toggle on option click', () => {
      render(
         <Options
            filteredOptions={mockOptions}
            selectedOption={undefined}
            focusedIndex={-1}
            toggle={toggleMock}
            selectValue={selectValueMock}
            setFocusedIndex={setFocusedIndexMock}
         />
      );

      fireEvent.click(screen.getByText('Python'));
      expect(selectValueMock).toHaveBeenCalledWith('py');
      expect(toggleMock).toHaveBeenCalled();
   });

   it('updates focus index on mouse enter', () => {
      render(
         <Options
            filteredOptions={mockOptions}
            selectedOption={undefined}
            focusedIndex={-1}
            toggle={toggleMock}
            selectValue={selectValueMock}
            setFocusedIndex={setFocusedIndexMock}
         />
      );

      fireEvent.mouseEnter(screen.getByText('JavaScript'));
      expect(setFocusedIndexMock).toHaveBeenCalledWith(0);
   });
});
