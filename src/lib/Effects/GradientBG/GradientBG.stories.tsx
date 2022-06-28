import GradientBG from './index';
import Button from '../../components/Button/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
   title: 'Effects/GradientBG',
   component: GradientBG,
   args: {
      children: 'Background',
      Element: 'li',
   },
   decorators: [
      (story) => (
         <div
            className="container"
            style={{
               height: '100px',
               width: '300px',
            }}
         >
            {story()}
         </div>
      ),
   ],
} as ComponentMeta<typeof GradientBG>;

export const Template: ComponentStory<typeof GradientBG> = (args) => (
   <GradientBG {...args} />
);

export const Focused = Template.bind({});
Focused.args = {
   Element: 'li',
   focused: true,
};

export const Animate = Template.bind({});
Animate.args = {
   children: (
      <Button
         style={{
            background: 'transparent',
            color: '#333',
         }}
      >
         <span>Animate</span>
      </Button>
   ),
   Animate: 'animation',
};
