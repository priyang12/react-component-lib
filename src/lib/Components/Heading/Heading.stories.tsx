import type { Meta, StoryObj } from '@storybook/react';
import Heading from './Heading';

const meta: Meta<typeof Heading> = {
   title: 'Typography/Heading',
   component: Heading,
   args: {
      children: 'The quick brown fox',
      as: 'h2',
   },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const CustomSize: Story = {
   args: {
      as: 'h3',
      size: 'xl',
   },
};

export const SmallHeading: Story = {
   args: {
      as: 'h5',
      size: 'sm',
   },
};
