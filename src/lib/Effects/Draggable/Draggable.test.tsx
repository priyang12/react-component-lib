import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as DraggableStories from './Draggable.stories';
const { Template } = composeStories(DraggableStories);

    it('should render without crashing', () => {
        render(<Template/>);
    });
