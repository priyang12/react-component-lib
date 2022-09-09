import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as DragNDropStories from './DragNDrop.stories';
const { Template, UnStyled } = composeStories(DragNDropStories);

it('should render without crashing with styles with default overlay', () => {
   const { container } = render(<Template />);
   expect(container.getElementsByClassName('DragNDrop').length).toBe(1);
   expect(container.getElementsByClassName('DragNDropContainer').length).toBe(
      1
   );
   expect(container.getElementsByClassName('DragNDropInput').length).toBe(1);
   expect(container.getElementsByClassName('DragNDropContent').length).toBe(2);
});

it('Check UnStyled', () => {
   const { container } = render(<UnStyled />);
   expect(container.getElementsByClassName('DragNDropInput').length).toBe(0);
   expect(container.getElementsByClassName('DragNDropContainer').length).toBe(
      0
   );
   expect(container.getElementsByClassName('DragNDropInput').length).toBe(0);
   expect(container.getElementsByClassName('DragNDropContent').length).toBe(0);
});
