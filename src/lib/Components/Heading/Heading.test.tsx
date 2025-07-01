import { render, screen } from '@testing-library/react';
import Heading from './Heading';
import { describe, it, expect } from 'vitest';

describe('Heading', () => {
   it('renders correct tag based on `as` prop', () => {
      render(<Heading as="h4">Heading 4</Heading>);
      const heading = screen.getByText('Heading 4');
      expect(heading.tagName).toBe('H4');
      expect(heading).toHaveClass('Heading--md'); // default for h4
   });

   it('applies size override when provided', () => {
      render(
         <Heading as="h4" size="lg">
            Custom Size
         </Heading>
      );
      const heading = screen.getByText('Custom Size');
      expect(heading).toHaveClass('Heading--lg');
   });

   it('includes custom className', () => {
      render(
         <Heading as="h2" className="my-heading">
            Heading
         </Heading>
      );
      const heading = screen.getByText('Heading');
      expect(heading).toHaveClass('my-heading');
      expect(heading).toHaveClass('Heading');
   });
});
