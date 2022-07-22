import Timer from './index';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Atoms/Timer',
   component: Timer,
   args: {
      StartTime: 0,
   },
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = args => <Timer {...args} />;

export const Default = Template.bind({});
