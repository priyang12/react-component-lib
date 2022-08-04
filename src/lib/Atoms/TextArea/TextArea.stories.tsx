import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextArea from './index';

export default {
   title: 'Atoms/TextArea',
   component: TextArea,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof TextArea>;

export const Template: ComponentStory<typeof TextArea> = args => (
   <TextArea {...args} />
);

export const Size = Template.bind({});

Size.args = {
   Size: 'medium',
};

export const Resize = Template.bind({});
Resize.args = {
   Size: 'medium',
   resize: 'vertical',
};
