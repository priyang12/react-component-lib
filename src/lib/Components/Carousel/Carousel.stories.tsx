import type { Meta, StoryFn } from '@storybook/react';
import Carousel from './Carousel';

export default {
   title: 'Components/Carousel',
   component: Carousel,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Carousel>;

export const Template: StoryFn<typeof Carousel> = (args) => (
   <Carousel {...args} />
);
