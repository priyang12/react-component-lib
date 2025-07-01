import type { Meta, StoryObj } from '@storybook/react';
import Truncate from './Truncate';

const meta: Meta<typeof Truncate> = {
   title: 'Helper/Truncate',
   component: Truncate,
   args: {
      children:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget nisl at odio feugiat laoreet. Sed ac elit at nunc bibendum suscipit. Cras volutpat purus ut arcu laoreet.',
      lines: 2,
      showTooltip: true,
   },
   decorators: [
      (Story) => (
         <div className="container text-[var(--text-primary)] w-1/3">
            <Story />
         </div>
      ),
   ],
};

export default meta;
type Story = StoryObj<typeof Truncate>;

export const Default: Story = {};

export const ThreeLines: Story = {
   args: {
      lines: 3,
   },
};

export const WithoutTooltip: Story = {
   args: {
      showTooltip: false,
   },
};
