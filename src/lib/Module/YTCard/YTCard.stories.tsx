import { ComponentMeta, ComponentStory } from '@storybook/react';
import YTCard from './index';
export default {
   title: 'Module/YTCard',
   component: YTCard,
   decorators: [
      (story) => (
         <div
            className="container"
            style={{
               width: '100%',
               maxWidth: '1200px',
               margin: '0 auto',
               height: '100vh',
            }}
         >
            {story()}
         </div>
      ),
   ],
} as ComponentMeta<typeof YTCard>;

export const Template: ComponentStory<typeof YTCard> = (args) => (
   <YTCard {...args} />
);
