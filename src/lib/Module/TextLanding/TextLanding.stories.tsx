import type { Meta, StoryFn } from '@storybook/react';
import TextLanding from './TextLanding';

export default {
   title: 'Module/TextLanding',
   component: TextLanding,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof TextLanding>;

export const Template: StoryFn<typeof TextLanding> = (args) => (
   <TextLanding {...args} />
);
