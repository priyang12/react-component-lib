import type { Meta, StoryFn } from '@storybook/react';
import { Button } from '../Button';
import DescriptionContainer from './DescriptionContainer';

export default {
   title: 'Inspiration/DescriptionContainer',
   component: DescriptionContainer,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof DescriptionContainer>;

export const Template: StoryFn<typeof DescriptionContainer> = (args) => (
   <DescriptionContainer
      className="w-1/2"
      hiddenContainerHeight="50px"
      // @ts-ignore
      renderDescription={() => (
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      )}
      {...args}
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

export const MultipleElements: StoryFn<typeof DescriptionContainer> = (
   args
) => (
   <DescriptionContainer
      {...args}
      defaultShow={true}
      renderDescription={() => (
         <p className="w-1/2 text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         </p>
      )}
   >
      {({ onMouseOver }) => (
         <div className="flex justify-center" onMouseOver={onMouseOver}>
            <Button variant="primary">Hover</Button>
            <Button variant="primary-border">Hover</Button>
            <Button variant="primary">Hover</Button>
         </div>
      )}
   </DescriptionContainer>
);
