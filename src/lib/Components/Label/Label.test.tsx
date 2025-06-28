import { render, screen } from '@testing-library/react';
import * as FormControl from '../FormControl/FormControl';
import Label from './Label';
import { vi } from 'vitest';

describe('Label', () => {
   const mockContext = {
      alert: '',
      isAlert: false,
      disabled: false,
      LabelCheck: false,
      overlay: false,
      inputChange: vi.fn(),
      onFocus: vi.fn(),
   };

   beforeEach(() => {
      vi.spyOn(FormControl, 'useFormContext').mockReturnValue(mockContext);
   });

   afterEach(() => {
      vi.restoreAllMocks();
   });

   it('renders children inside label', () => {
      render(<Label htmlFor="email">Email</Label>);
      expect(screen.getByText('Email')).toBeInTheDocument();
   });

   it('applies hidden class when hidden prop is true', () => {
      render(
         <Label htmlFor="email" hidden>
            Email
         </Label>
      );
      expect(screen.getByText('Email')).toHaveClass('visually-hidden');
   });

   it('applies size class', () => {
      render(
         <Label htmlFor="email" size="large">
            Email
         </Label>
      );
      expect(screen.getByText('Email')).toHaveClass('label--large');
   });

   it('adds active class when LabelCheck is true', () => {
      vi.spyOn(FormControl, 'useFormContext').mockReturnValue({
         ...mockContext,
         LabelCheck: true,
      });

      render(<Label htmlFor="username">Username</Label>);
      expect(screen.getByText('Username')).toHaveClass('active');
   });

   it('adds overlay class when overlay is true', () => {
      vi.spyOn(FormControl, 'useFormContext').mockReturnValue({
         ...mockContext,
         overlay: true,
      });

      render(<Label htmlFor="username">Username</Label>);
      expect(screen.getByText('Username')).toHaveClass('overlay');
   });

   it('displays alert message when alert is provided', () => {
      const alertText = 'Field is required';
      vi.spyOn(FormControl, 'useFormContext').mockReturnValue({
         ...mockContext,
         alert: alertText,
      });

      render(<Label htmlFor="email">Email</Label>);
      const alertEl = screen.getByRole('alert');
      expect(alertEl).toHaveTextContent(alertText);
      expect(alertEl).toHaveAttribute('aria-live', 'assertive');
   });

   it('sets data-valid attribute based on LabelCheck', () => {
      vi.spyOn(FormControl, 'useFormContext').mockReturnValue({
         ...mockContext,
         LabelCheck: true,
      });

      render(<Label htmlFor="input">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-valid', 'true');
   });
});
