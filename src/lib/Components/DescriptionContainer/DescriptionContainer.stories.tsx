import type { Meta, StoryFn } from '@storybook/react';
import { Button } from '../Button';
import DescriptionContainer from './DescriptionContainer';

export default {
   title: 'Inspiration/DescriptionContainer',
   component: DescriptionContainer,
   decorators: [
      (story) => (
         <div
            className="container"
            style={{
               backgroundColor: '#333',
            }}
         >
            {story()}
         </div>
      ),
   ],
} as Meta<typeof DescriptionContainer>;

export const Template: StoryFn<typeof DescriptionContainer> = (args) => (
   <DescriptionContainer {...args}>
      <Button
         style={{
            backgroundColor: '#ee37dc',
            fontSize: '1.5rem',
            padding: '.5rem 2rem',
         }}
         radius={'1.5rem'}
      >
         Hover
      </Button>
      <p>
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
         aliquid repellendus magni aliquam consequatur, odit placeat quibusdam
         cum, amet obcaecati, omnis itaque possimus necessitatibus nam
         inventore? Itaque hic ducimus soluta.
      </p>
   </DescriptionContainer>
);

export const HiddenContainerHeight = Template.bind({});
HiddenContainerHeight.args = {
   HiddenContainerHeight: '200px',
};

export const ContainerWidth = Template.bind({});
ContainerWidth.args = {
   width: '50%',
};
