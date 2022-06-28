import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextLanding from './index';
export default {
   title: 'Template/TextLanding',
   component: TextLanding,
   decorators: [(story) => <div className="container">{story()}</div>],
} as ComponentMeta<typeof TextLanding>;

export const Template: ComponentStory<typeof TextLanding> = (args) => (
   <TextLanding {...args} />
);
