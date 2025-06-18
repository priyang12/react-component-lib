import type { Meta, StoryFn } from '@storybook/react';
import { Button } from '../../Components/Button';
import GradientHover from './GradientHover';

export default {
   title: 'Wrappers/GradientBorder',
   component: GradientHover,
   args: {
      BorderSize: '0.2em',
      children: <Button>Border Wall</Button>,
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof GradientHover>;

const Template: StoryFn<typeof GradientHover> = (args) => (
   <GradientHover {...args} />
);

export const Default = Template.bind({});

export const BorderSize = Template.bind({});

BorderSize.args = {
   BorderSize: '0.5em',
};

export const BorderAnimation = Template.bind({});
BorderAnimation.args = {
   animation: ' grd 0.2s ease-in-out infinite',
};

export const Faster = BorderAnimation.bind({});

Faster.args = {
   animation: 'grd 0.1s ease-in-out infinite',
};
