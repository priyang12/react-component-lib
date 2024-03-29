import Ring from './Ring';
import Button from '../../Atoms/Button/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
   title: 'Effects/Ring',
   component: Ring,
   args: {
      children: <Button>Ring it Ring</Button>,
   },
   argTypes: {
      children: {
         control: {
            table: { disable: true },
         },
      },
   },
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Ring>;

export const Template: ComponentStory<typeof Ring> = args => <Ring {...args} />;

export const BoderRadius = Template.bind({});
BoderRadius.args = {
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
