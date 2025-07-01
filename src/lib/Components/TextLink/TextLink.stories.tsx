import type { Meta, StoryObj } from '@storybook/react';
import TextLink from './TextLink';

const meta: Meta<typeof TextLink> = {
   title: 'Typography/TextLink',
   component: TextLink,
   tags: ['autodocs'],
   args: {
      children: 'Learn more',
      href: '#',
   },
   decorators: [
      (Story) => (
         <div className="container">
            <Story />
         </div>
      ),
   ],
};

export default meta;
type Story = StoryObj<typeof TextLink>;

export const Default: Story = {};

export const AlwaysUnderline: Story = {
   args: {
      underline: 'always',
   },
};

export const NoUnderline: Story = {
   args: {
      underline: 'none',
   },
};

export const Muted: Story = {
   args: {
      variant: 'muted',
   },
};
