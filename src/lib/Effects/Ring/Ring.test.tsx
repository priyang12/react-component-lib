import { render } from '@testing-library/react';
import * as RingStories from './Ring.stories';
import { composeStories } from '@storybook/testing-react';

const { BoderRadius, OuterRingColor, RingColor, Template } = composeStories(
   RingStories
);

it('should render without crashing', () => {
   render(<Template />);
});

it('should render with border radius', () => {
   render(<BoderRadius />);
});

it('should render with outer ring color', () => {
   render(<OuterRingColor />);
});

it('should render with ring color', () => {
   render(<RingColor />);
});
