import type { Meta, StoryFn } from '@storybook/react';
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

   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<any>;

export const Template: StoryFn<typeof TextEffect> = (args) => (
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
