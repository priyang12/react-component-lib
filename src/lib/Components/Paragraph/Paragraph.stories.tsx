import type { Meta, StoryObj } from '@storybook/react';
import Paragraph, { Lead } from './Paragraph';

const meta: Meta<typeof Paragraph> = {
   title: 'Typography/Paragraph',
   component: Paragraph,
   subcomponents: {
      Lead,
   },
   args: {
      children: 'This is a paragraph of text designed to show body content.',
      size: 'md',
   },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {};

export const Large: Story = {
   args: {
      size: 'lg',
   },
};

export const AsSpan: Story = {
   args: {
      as: 'span',
   },
};

export const WithLead = () => {
   return (
      <Paragraph>
         <Lead>Lorem ipsum dolor sit amet,</Lead> consectetur adipisicing elit.
         Enim repellendus possimus quia provident pariatur ad exercitationem
         neque cum quae odit delectus libero odio architecto velit dolore,
         suscipit, cumque quos non.
      </Paragraph>
   );
};
