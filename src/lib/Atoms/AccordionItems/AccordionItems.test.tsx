import { render, fireEvent, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as AccordionItemsStories from './AccordionItems.stories';

const { Template } = composeStories(AccordionItemsStories);

it('renders correctly', () => {
   const { container } = render(<Template />);
   expect(container).toMatchSnapshot();
});
it('handles key press events correctly', () => {
   const handleKeyDown = jest.fn();
   render(<Template onKeyDown={handleKeyDown} />);
   fireEvent.keyDown(screen.getByText('item one'), { code: 'Enter' });
   expect(handleKeyDown).toHaveBeenCalled();
});
