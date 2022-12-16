import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as AccordionStories from './Accordion.stories';
const { Template } = composeStories(AccordionStories);

    it('should render without crashing', () => {
        render(<Template/>);
    });
