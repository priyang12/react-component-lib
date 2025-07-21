import Ring from './Ring';
import Button from '../../Components/Button/Button';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Wrappers/Ring',
   component: Ring,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Ring>;

export const Template: StoryFn<typeof Ring> = (args) => (
   <Ring {...args}>
      <Button>Ring Around Button</Button>
   </Ring>
);

export const BorderRadius = Template.bind({});
BorderRadius.args = {
   radius: '15px',
};

export const RingColor = Template.bind({});
RingColor.args = {
   radius: '10px',
   ringColor: '#333',
   ringWidth: '2px',
};

export const OuterRingColor = Template.bind({});
OuterRingColor.args = {
   radius: '20px',
   ringColor: '#333',
   ringWidth: '2px',
   OuterRingColor: 'red',
};

export const ButtonRing: StoryFn<typeof Ring> = (args) => (
   <Ring asChild {...args}>
      <Button
         className="flex"
         role="link"
         style={{
            backgroundColor: 'red',
         }}
      >
         Ring Around Button
      </Button>
   </Ring>
);
