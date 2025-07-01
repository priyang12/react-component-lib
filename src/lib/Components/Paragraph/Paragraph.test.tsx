import { render, screen } from '@testing-library/react';
import Paragraph, { Lead } from './Paragraph';
import { describe, it, expect } from 'vitest';

describe('Paragraph', () => {
   it('renders paragraph text', () => {
      render(<Paragraph>This is a paragraph.</Paragraph>);
      expect(screen.getByText('This is a paragraph.')).toBeInTheDocument();
   });

   it('applies correct size class', () => {
      render(<Paragraph size="lg">Large text</Paragraph>);
      expect(screen.getByText('Large text')).toHaveClass('Paragraph--lg');
   });

   it('applies correct tone class', () => {
      render(<Paragraph tone="success">Success tone</Paragraph>);
      expect(screen.getByText('Success tone')).toHaveClass(
         'Paragraph--success'
      );
   });

   it('renders inline Lead inside Paragraph', () => {
      render(
         <Paragraph>
            <Lead>Intro:</Lead> This is the rest of the paragraph.
         </Paragraph>
      );
      expect(screen.getByText('Intro:')).toBeInTheDocument();
      expect(screen.getByText('Intro:')).toHaveClass('Paragraph--lead');
   });
});
