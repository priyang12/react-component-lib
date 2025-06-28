import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from './TextArea';
import { FormControlContext } from '../FormControl/FormControl';

describe('TextArea', () => {
   const setup = (props = {}) => {
      const mockContext = {
         alert: '',
         inputChange: vi.fn(),
         onFocus: vi.fn(),
         disabled: false,
         LabelCheck: false,
         overlay: false,
      } as any;

      return render(
         <FormControlContext.Provider value={mockContext}>
            <TextArea size="medium" {...props} />
         </FormControlContext.Provider>
      );
   };

   it('renders with default medium size dimensions', () => {
      setup();
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '5');
      expect(textarea).toHaveAttribute('cols', '30');
   });

   it('applies correct size classes', () => {
      setup({ size: 'large', className: 'custom-textarea' });
      const textarea = screen.getByRole('textbox');
      expect(textarea.className).toContain('large');
      expect(textarea.className).toContain('custom-textarea');
   });

   it('applies resize style correctly', () => {
      setup({ resize: 'vertical' });
      const textarea = screen.getByRole('textbox');
      expect(textarea.style.resize).toBe('vertical');
   });

   it('calls context inputChange and onFocus handlers', () => {
      const inputChange = vi.fn();
      const onFocus = vi.fn();

      render(
         <FormControlContext.Provider
            value={
               {
                  alert: '',
                  inputChange,
                  onFocus,
                  disabled: false,
                  LabelCheck: false,
                  overlay: false,
               } as any
            }
         >
            <TextArea size="small" />
         </FormControlContext.Provider>
      );

      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'Hello' } });
      fireEvent.focus(textarea);
      expect(inputChange).toHaveBeenCalled();
      expect(onFocus).toHaveBeenCalled();
   });

   it('shows alert border when alert is present', () => {
      render(
         <FormControlContext.Provider
            value={
               {
                  alert: 'Required field',
                  inputChange: vi.fn(),
                  onFocus: vi.fn(),
                  disabled: false,
                  LabelCheck: false,
                  overlay: false,
               } as any
            }
         >
            <TextArea size="small" />
         </FormControlContext.Provider>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea.className).toContain('Alert-Border');
   });
});
