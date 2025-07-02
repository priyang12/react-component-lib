import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PinInput from './PinInput';

describe('PinInput', () => {
   it('renders the correct number of inputs', () => {
      render(<PinInput length={6} />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(6);
   });

   it('calls onChange when input changes', () => {
      const onChange = vi.fn();
      render(<PinInput length={4} onChange={onChange} />);
      const inputs = screen.getAllByRole('textbox');

      fireEvent.change(inputs[0], { target: { value: '1' } });

      expect(onChange).toHaveBeenCalledWith('1');
   });

   it('focuses next input on character input', () => {
      render(<PinInput length={4} />);
      const inputs = screen.getAllByRole('textbox');

      fireEvent.change(inputs[0], { target: { value: '5' } });

      expect(document.activeElement).toBe(inputs[1]);
   });

   it('calls onComplete when all inputs are filled', () => {
      const onComplete = vi.fn();
      render(<PinInput length={3} onComplete={onComplete} />);
      const inputs = screen.getAllByRole('textbox');

      fireEvent.change(inputs[0], { target: { value: '1' } });
      fireEvent.change(inputs[1], { target: { value: '2' } });
      fireEvent.change(inputs[2], { target: { value: '3' } });

      expect(onComplete).toHaveBeenCalledWith('123');
   });

   it('disables all inputs when disabled prop is true', () => {
      render(<PinInput length={4} disabled />);
      const inputs = screen.getAllByRole('textbox');

      inputs.forEach((input) => {
         expect(input).toBeDisabled();
      });
   });

   it('auto focuses first input when autoFocus is true', () => {
      render(<PinInput length={4} autoFocus />);
      const inputs = screen.getAllByRole('textbox');

      expect(document.activeElement).toBe(inputs[0]);
   });
});
