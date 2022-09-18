import HoverCard from './HoverCard';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Module/HoverCard',
   component: HoverCard,
   args: {
      PreviewTitle: '"Preview"',
   },
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof HoverCard>;

export const Template: ComponentStory<typeof HoverCard> = args => (
   <HoverCard {...args} />
);
