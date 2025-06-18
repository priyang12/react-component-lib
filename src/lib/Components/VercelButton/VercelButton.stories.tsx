import type { Meta, StoryFn } from '@storybook/react';
import { Button } from '../Button';
import VercelButton from './VercelButton';

export default {
   title: 'Inspiration/VercelButton',
   component: VercelButton,
   args: {
      AnimationCss: 'vercel-animation',
   },
   decorators: [
      (story) => (
         <div
            className="container"
            style={{
               height: '100px',
               padding: '20px',
               backgroundColor: '#333',
            }}
         >
            {story()}
         </div>
      ),
   ],
} as Meta<typeof VercelButton>;

const Template: StoryFn<typeof VercelButton> = (args) => (
   <VercelButton
      {...args}
      className="w-6"
      // style={{
      //    width: '200px',
      // }}
   >
      <Button
         style={{
            background: 'black',
            width: 'calc(100% + 10px)',
            height: 'calc(100% + 10px)',
            transition: 'all 0.5s ease',
         }}
      >
         TEXT
      </Button>
   </VercelButton>
);

export const VercelAnimation = Template.bind({});

VercelAnimation.args = {
   AnimationCss: 'vercel-animation',
};

export const BorderHover = Template.bind({});

BorderHover.args = {
   AnimationCss: 'border-animation',
};
