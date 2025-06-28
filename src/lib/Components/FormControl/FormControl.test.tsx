import { render, screen } from '@testing-library/react';
import FormControl, { useFormContext } from './FormControl';
import { vi } from 'vitest';

// Mock the useFormControl hook
vi.mock('./Hooks/useFormControl', () => ({
   useFormControl: () => ({
      labelCheck: true,
      alert: 'Required field',
      isAlert: true,
      inputChange: vi.fn(),
      onFocus: vi.fn(),
   }),
}));

describe('FormControl', () => {
   it('render without crash', () => {
      render(
         <FormControl>
            <div>Child</div>
         </FormControl>
      );
   });
   it('renders children inside a wrapper div', () => {
      render(
         <FormControl>
            <label htmlFor="input">Label</label>
            <input id="input" />
         </FormControl>
      );
      expect(screen.getByLabelText('Label')).toBeInTheDocument();
   });

   it('applies custom class names', () => {
      render(<FormControl className="custom-class" />);
      expect(screen.getByRole('group')).toHaveClass(
         'form-control',
         'custom-class'
      );
   });

   it('provides context values to children', () => {
      let contextValue: any;

      const Consumer = () => {
         contextValue = useFormContext();
         return <span>Consumer</span>;
      };

      render(
         <FormControl overlay disabled alertMessage="Error">
            <Consumer />
         </FormControl>
      );

      expect(contextValue).toMatchObject({
         alert: 'Required field',
         isAlert: true,
         disabled: true,
         overlay: true,
         LabelCheck: true,
      });
   });

   it('supports optional props like validate and alertMessage', () => {
      const customValidate = (value: string) =>
         value.length > 0 ? '' : 'Missing';
      render(
         <FormControl alertMessage="Initial alert" validate={customValidate}>
            <input aria-label="field" />
         </FormControl>
      );
      expect(screen.getByLabelText('field')).toBeInTheDocument();
   });
});
