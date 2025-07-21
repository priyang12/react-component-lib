import type { Meta, StoryFn } from '@storybook/react';
import DescriptionContainer from './DescriptionContainer';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { FiShield, FiStar } from 'react-icons/fi';
import { Button } from '../Button';

export default {
   title: 'Inspiration/DescriptionContainer',
   component: DescriptionContainer,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof DescriptionContainer>;

export const Template: StoryFn<typeof DescriptionContainer> = (args) => (
   <DescriptionContainer
      {...args}
      className="w-1/3"
      hiddenContainerHeight="50px"
      renderDescription={() => (
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      )}
   >
      {({ onMouseOver }) => (
         <Button variant="info-border" onMouseOver={onMouseOver}>
            Hover
         </Button>
      )}
   </DescriptionContainer>
);

export const ContainerHeight = Template.bind({});
ContainerHeight.args = {
   hiddenContainerHeight: '200px',
   renderDescription: () => (
      <p
         style={{
            height: '200px',
         }}
      >
         Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
   ),
};

export const DefaultShow = Template.bind({});
DefaultShow.args = {
   defaultShow: true,
};

export const Horizontal: StoryFn<typeof DescriptionContainer> = (args) => (
   <DescriptionContainer
      {...args}
      direction="Horizontal"
      hiddenContainerWidth="20vw"
      renderDescription={() => (
         <div className="flex justify-center">
            <Button variant="primary">
               <HiOutlineLightningBolt style={{ marginRight: 8 }} />
            </Button>

            <Button variant="primary-border">
               <FiShield style={{ marginRight: 8 }} />
            </Button>

            <Button variant="primary">
               <FiStar style={{ marginRight: 8 }} />
            </Button>
         </div>
      )}
   >
      {({ onMouseOver }) => (
         <Button
            variant="info-border"
            className="h-fit"
            onMouseOver={onMouseOver}
         >
            Hover
         </Button>
      )}
   </DescriptionContainer>
);
