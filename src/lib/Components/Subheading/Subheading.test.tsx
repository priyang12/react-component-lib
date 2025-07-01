import { render, screen } from '@testing-library/react';
import Subheading from './Subheading';
import { describe, it, expect } from 'vitest';

describe('Subheading', () => {
   it('renders children text', () => {
      render(<Subheading>This is a subheading</Subheading>);
      expect(screen.getByText('This is a subheading')).toBeInTheDocument();
   });

   it('renders with default tag <p>', () => {
      render(<Subheading>Default paragraph</Subheading>);
      const element = screen.getByText('Default paragraph');
      expect(element.tagName).toBe('P');
   });

   it('supports rendering as a different tag', () => {
      render(<Subheading as="h4">Heading-like Subheading</Subheading>);
      const element = screen.getByText('Heading-like Subheading');
      expect(element.tagName).toBe('H4');
   });

   it('applies default size class', () => {
      render(<Subheading>Default size</Subheading>);
      const element = screen.getByText('Default size');
      expect(element).toHaveClass('Subheading--md');
   });
});
