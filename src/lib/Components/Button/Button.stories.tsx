import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
   title: 'Atoms/Button',
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

// Variant
export const Variant: Story = {
   args: {
      text: 'Primary Button',
      radius: '10px',
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

// Radius
export const Radius: Story = {
   args: {
      text: 'Radius Button',
      radius: '10px',
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
      <Button ellipsis={true} {...args}>
         <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
               fill="#333"
            />
            <path
               d="M12.5 7H11V13L15 17L11.5 13.5V16H12.5C13.33 16 14 15.33 14 14.5C14 13.67 13.33 13 12.5 13H11.5V7Z"
               fill="#333"
            />
         </svg>
         Button with icon
      </Button>
   ),
};

// Icon with variant
export const IconVariant: Story = {
   ...Icon,
   args: {
      variant: 'secondary-border',
   },
};
