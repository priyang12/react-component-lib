import Ring from './index';
import Button from '../../components/Button/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { STORYBOOK_EXCLUDE_CHAKRA_PROPS } from '../../Utils/ChakraExlude';

export default {
   title: 'Effects/Ring',
   component: Ring,
   args: {
      children: <Button>Ring it Ring</Button>,
   },
   argTypes: STORYBOOK_EXCLUDE_CHAKRA_PROPS,

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
