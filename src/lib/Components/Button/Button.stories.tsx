import type { Meta, StoryObj } from '@storybook/react';
import { FaLifeRing } from 'react-icons/fa';
import Button from './Button';

const meta: Meta<typeof Button> = {
   title: 'Components/Button',
   component: Button,
   decorators: [
      (Story) => (
         <div className="container">
            <Story />
         </div>
      ),
   ],
};

export default meta;

type Story = StoryObj<typeof Button>;

// Default
export const Default: Story = {
   args: {
      text: 'Button',
   },
};

// make a ripple on click.
export const RippleVariant: Story = {
   args: {
      ripple: {
         show: true,
         bgColor: 'red',
      },
      text: 'Button',
   },
};

// Variant
export const Variant: Story = {
   args: {
      text: 'Primary Button',
      variant: 'primary',
   },
};

// Border Variant
export const BorderVariant: Story = {
   args: {
      text: 'Border Variant Button',
      variant: 'primary-border',
   },
};

// Custom Color
export const CustomColorVariant: Story = {
   args: {
      text: 'Custom Color Variant Button',
      variant: 'primary-border',
      style: {
         color: '#333',
      },
   },
};

// Long Text with ellipsis
export const LongText: Story = {
   args: {
      text: 'This is a very long text that should be truncated',
      ellipsis: true,
      style: {
         width: '30%',
      },
   },
};

// Loading
export const LoadingButton: Story = {
   args: {
      isLoading: true,
      LoadingText: 'Loading Please wait',
   },
};

// Icon Story with children
export const Icon: Story = {
   render: (args) => (
      <Button {...args} iconComponent={<FaLifeRing role="icon" />}>
         Button with icon
      </Button>
   ),
};
