import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VisuallyHidden from './VisuallyHidden';

describe('VisuallyHidden', () => {
   it('renders children', () => {
      render(<VisuallyHidden>Hidden content</VisuallyHidden>);
      expect(screen.getByText('Hidden content')).toBeInTheDocument();
   });

   it('applies visually hidden class', () => {
      render(<VisuallyHidden>Content</VisuallyHidden>);
      const element = screen.getByText('Content');
      expect(element).toHaveClass('visuallyHidden');
   });

   it('is not focusable by default', () => {
      render(<VisuallyHidden>Non-focusable</VisuallyHidden>);
      const element = screen.getByText('Non-focusable');
      expect(element).toHaveAttribute('tabIndex', '-1');
   });

   it('is focusable when isFocusable is true', () => {
      render(<VisuallyHidden isFocusable>Focusable</VisuallyHidden>);
      const element = screen.getByText('Focusable');
      expect(element).toHaveAttribute('tabIndex', '0');
   });

   it('triggers click on Enter key when isFocusable is true', () => {
      const handleClick = vi.fn();
      render(
         <VisuallyHidden isFocusable onClick={handleClick}>
            Pressable
         </VisuallyHidden>
      );
      const element = screen.getByText('Pressable');
      fireEvent.keyDown(element, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalled();
   });

   it('triggers click on Space key when isFocusable is true', () => {
      const handleClick = vi.fn();
      render(
         <VisuallyHidden isFocusable onClick={handleClick}>
            SpacePress
         </VisuallyHidden>
      );
      const element = screen.getByText('SpacePress');
      fireEvent.keyDown(element, { key: ' ' });
      expect(handleClick).toHaveBeenCalled();
   });

   it('blurs on Escape key press', () => {
      render(<VisuallyHidden isFocusable>EscapeTest</VisuallyHidden>);
      const element = screen.getByText('EscapeTest') as HTMLElement;
      element.focus();
      expect(document.activeElement).toBe(element);
      fireEvent.keyDown(element, { key: 'Escape' });
      expect(document.activeElement).not.toBe(element);
   });
});
