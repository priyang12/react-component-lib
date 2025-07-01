import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Tag from './Tag';
import { AiOutlineSmile } from 'react-icons/ai';

describe('Tag component', () => {
   it('renders children correctly', () => {
      render(<Tag color="#eee">Test Tag</Tag>);
      expect(screen.getByText('Test Tag')).toBeInTheDocument();
   });

   it('applies custom background color via style', () => {
      render(<Tag color="rgb(255, 0, 0)">Colored Tag</Tag>);
      const tag = screen.getByText('Colored Tag')!;
      expect(tag).toHaveStyle({ 'background-color': 'rgb(255, 0, 0)' });
   });

   it('renders close icon and removes tag on click', () => {
      render(
         <Tag color="#eee" closeIcon>
            Closable Tag
         </Tag>
      );
      const closeBtn = screen.getByRole('img');
      fireEvent.click(closeBtn);
      expect(screen.queryByText('Closable Tag')).not.toBeInTheDocument();
   });

   it('calls onClose when close icon is clicked', () => {
      const onClose = vi.fn();
      render(
         <Tag color="#eee" closeIcon onClose={onClose}>
            Tag with onClose
         </Tag>
      );
      const closeBtn = screen.getByRole('img');
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalled();
   });

   it('renders custom close icon when provided', () => {
      const CustomIcon = <span data-testid="custom-close">X</span>;
      render(
         <Tag color="#eee" closeIcon={CustomIcon}>
            Custom Close
         </Tag>
      );
      expect(screen.getByTestId('custom-close')).toBeInTheDocument();
   });

   it('renders leading icon when provided', () => {
      render(
         <Tag color="#eee" icon={<AiOutlineSmile data-testid="leading-icon" />}>
            With Icon
         </Tag>
      );
      expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
   });

   it('applies variant class when provided', () => {
      render(
         <Tag color="#eee" variant="success">
            Variant Tag
         </Tag>
      );
      const tag = screen.getByText('Variant Tag');
      expect(tag.className).toMatch(/Tag--success/);
   });
});
