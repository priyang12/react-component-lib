import type { Meta, StoryObj } from '@storybook/react';
import Blockquote from './Blockquote';

const meta: Meta<typeof Blockquote> = {
   title: 'Typography/Blockquote',
   component: Blockquote,
   args: {
      children:
         '“Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, commodi.”',
      cite: '– John Dow',
   },
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {};

export const WithoutCite: Story = {
   args: {
      cite: undefined,
   },
};

export const CustomTag: Story = {
   args: {
      as: 'section',
   },
};

export const LongQuote: Story = {
   args: {
      cite: undefined,
      children: (
         <>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
            iste perferendis rerum expedita ab dignissimos maxime nesciunt natus
            officia odio accusamus nostrum amet similique illum magni at
            aspernatur optio eum!
            <cite>– John Dow</cite>
         </>
      ),
   },
};
