import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextEffect from './TextEffect';

export default {
   title: 'Atoms/TextEffect',
   component: TextEffect,
   args: {
      size: '2rem',
      Element: 'p',
      Delay: '2s',
      ContainerText: 'Text Fade',
      animateTime: '1s',
   },

   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<any>;

export const Template: ComponentStory<typeof TextEffect> = args => (
   <TextEffect {...args} />
);

export const LargeText = Template.bind({});

LargeText.args = {
   size: '5rem',
};

export const AnimateTime = Template.bind({});
AnimateTime.args = {
   size: '5rem',
   animateTime: '1',
};

export const DifferentDelay = Template.bind({});
DifferentDelay.args = {
   size: '3rem',
   Delay: '5s',
};
