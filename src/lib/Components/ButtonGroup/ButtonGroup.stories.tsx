import ButtonGroup from './ButtonGroup';
import type { Meta, StoryFn } from '@storybook/react';
import { Button } from '../Button';

export default {
   title: 'Components/ButtonGroup',
   component: ButtonGroup,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof ButtonGroup>;

export const Template: StoryFn<typeof ButtonGroup> = (args) => (
   <ButtonGroup {...args}>
      <Button>
         <span>Button 1</span>
      </Button>
      <Button variant="primary-border">
         <span>Button 2</span>
      </Button>
      <Button>
         <span>Button 3</span>
      </Button>
   </ButtonGroup>
);

export const Gap = Template.bind({});

export const Icon: StoryFn<typeof ButtonGroup> = (args) => (
   <ButtonGroup {...args} withIcon>
      <div>$</div>
      <Button>
         <span>Button 1</span>
      </Button>
   </ButtonGroup>
);
