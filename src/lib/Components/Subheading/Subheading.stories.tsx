import type { Meta, StoryObj } from '@storybook/react';
import Subheading from './Subheading';

const meta: Meta<typeof Subheading> = {
   title: 'Typography/Subheading',
   component: Subheading,
   args: {
      children: 'This is a subheading',
      size: 'md',
   },
   argTypes: {
      size: {
         control: 'select',
         options: ['lg', 'md', 'sm'],
      },
      as: {
         control: 'select',
         options: ['p', 'div', 'span', 'h4'],
      },
   },
};

export default meta;
type Story = StoryObj<typeof Subheading>;

export const Default: Story = {};

export const Large: Story = {
   args: {
      size: 'lg',
   },
};

export const SmallAsSpan: Story = {
   args: {
      size: 'sm',
      as: 'span',
   },
};
