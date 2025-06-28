import { render, screen } from '@testing-library/react';
import ButtonGroup from './ButtonGroup';
import { Button } from '../Button';

describe('ButtonGroup', () => {
   it('renders with role="group"', () => {
      render(
         <ButtonGroup>
            <Button text="A" />
            <Button text="B" />
         </ButtonGroup>
      );
      expect(screen.getByRole('group')).toBeInTheDocument();
   });

   it('renders all children', () => {
      render(
         <ButtonGroup>
            <Button text="One" />
            <Button text="Two" />
         </ButtonGroup>
      );
      expect(screen.getByText('One')).toBeInTheDocument();
      expect(screen.getByText('Two')).toBeInTheDocument();
   });

   it('passes group-level variant to child buttons', () => {
      render(
         <ButtonGroup variant="failure">
            <Button text="Delete" />
         </ButtonGroup>
      );
      const button = screen.getByRole('button');
      expect(button.className).toMatch(/Button-failure/);
   });

   it('allows individual button to override variant', () => {
      render(
         <ButtonGroup variant="secondary">
            <Button text="Custom" variant="success" />
         </ButtonGroup>
      );
      const button = screen.getByRole('button');
      expect(button.className).toMatch(/Button-success/); // Not Button-secondary
   });

   it('does not affect non-Button children', () => {
      render(
         <ButtonGroup variant="primary">
            <span>Not a button</span>
         </ButtonGroup>
      );
      expect(screen.getByText('Not a button')).toBeInTheDocument();
   });
});
