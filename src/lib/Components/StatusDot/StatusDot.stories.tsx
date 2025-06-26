import type { Meta, StoryFn } from '@storybook/react';
import StatusDot from './StatusDot';

export default {
   title: 'Helper/StatusDot',
   component: StatusDot,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof StatusDot>;

export const Template: StoryFn<typeof StatusDot> = (args) => (
   <StatusDot {...args} />
);
