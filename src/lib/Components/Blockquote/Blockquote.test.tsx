import { render, screen } from '@testing-library/react';
import Blockquote from './Blockquote';
import { describe, it, expect } from 'vitest';

describe('Blockquote', () => {
   it('renders the quote content', () => {
      render(
         <Blockquote>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
            commodi?.”
         </Blockquote>
      );
      expect(
         screen.getByText(
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, commodi?.”'
         )
      ).toBeInTheDocument();
   });

   it('renders the visible cite if provided', () => {
      render(
         <Blockquote cite="– John Dow">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
            commodi?.”
         </Blockquote>
      );
      expect(screen.getByText('– John Dow')).toBeInTheDocument();
   });

   it('does not render cite element when cite is not provided', () => {
      render(<Blockquote>“Think different.”</Blockquote>);
      expect(screen.queryByText(/–/)).not.toBeInTheDocument();
   });
});
