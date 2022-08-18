import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as DragNDropStories from './DragNDrop.stories';
const { Template } = composeStories(DragNDropStories);

it('should render without crashing', () => {
   render(<Template />);
});
