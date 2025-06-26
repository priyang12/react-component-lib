import type { Meta, StoryFn } from '@storybook/react';
import Divider from './Divider';

export default {
   title: 'Helper/Divider',
   component: Divider,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Divider>;

export const Template: StoryFn<typeof Divider> = (_) => <Divider />;

export const Text: StoryFn<typeof Divider> = (_) => <Divider>OR</Divider>;

export const Vertical: StoryFn<typeof Divider> = (_) => (
   <div className="h-screen">
      <Divider align="vertical" />
   </div>
);
