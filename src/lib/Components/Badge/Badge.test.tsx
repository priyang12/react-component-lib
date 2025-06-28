import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as BadgeStories from './Badge.stories';

const {
   Template: Default,
   Variant,
   AnchorOrigin,
} = composeStories(BadgeStories);

describe('Badge', () => {
   it('renders with content', () => {
      render(
         <Default
            BadgeContent={5}
            anchorOriginVertical="top"
            anchorOriginHorizontal="right"
         />
      );
      expect(screen.getByText('5')).toBeInTheDocument();
   });

   it('renders with max truncation', () => {
      render(
         <Default
            BadgeContent={120}
            Max={99}
            anchorOriginVertical="top"
            anchorOriginHorizontal="right"
         />
      );
      expect(screen.getByText('99+')).toBeInTheDocument();
   });

   it('renders full content if value <= max', () => {
      render(
         <Default
            BadgeContent={42}
            Max={99}
            anchorOriginVertical="top"
            anchorOriginHorizontal="right"
         />
      );
      expect(screen.getByText('42')).toBeInTheDocument();
   });

   it('applies position classes based on props', () => {
      render(
         <AnchorOrigin
            BadgeContent={1}
            anchorOriginVertical="bottom"
            anchorOriginHorizontal="left"
         />
      );
      const badge = screen.getByText('1');
      expect(badge).toHaveClass('badge-position-bottom-left');
   });

   it('Render variant', () => {
      render(<Variant variant="primary-border" />);
      expect(document.querySelector('.badge')).toHaveClass(
         'badge-primary-border'
      );
   });

   it('shows full content only on hover when showOnHover is true', () => {
      render(
         <Default
            BadgeContent={200}
            Max={99}
            showOnHover
            anchorOriginVertical="top"
            anchorOriginHorizontal="right"
         />
      );
      const badge = screen.getByText('99+');
      fireEvent.mouseEnter(badge);
      expect(screen.getByText('200')).toBeInTheDocument();
      fireEvent.mouseLeave(badge);
      expect(screen.getByText('99+')).toBeInTheDocument();
   });
});
