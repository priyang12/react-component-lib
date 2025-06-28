import ButtonGroup from './ButtonGroup';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Button } from '../Button';

export default {
   title: 'Components/ButtonGroup',
   component: ButtonGroup,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof ButtonGroup>;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: StoryFn<Story> = (args) => (
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

export const WithVariant: StoryFn<Story> = (args) => (
   <ButtonGroup {...args} variant="secondary">
      <Button>
         <span>Button A</span>
      </Button>
      <Button variant="primary">
         <span>Button B</span>
      </Button>
      <Button>
         <span>Button C</span>
      </Button>
   </ButtonGroup>
);
