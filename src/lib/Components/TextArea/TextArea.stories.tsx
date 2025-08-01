import type { Meta, StoryFn } from '@storybook/react';
import TextArea from './TextArea';

export default {
   title: 'Components/TextArea',
   component: TextArea,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof TextArea>;

export const Template: StoryFn<typeof TextArea> = (args) => (
   <TextArea {...args} />
);

export const Size = Template.bind({});
Size.args = {
   size: 'medium',
};

export const Resize = Template.bind({});
Resize.args = {
   size: 'medium',
   resize: 'vertical',
};
