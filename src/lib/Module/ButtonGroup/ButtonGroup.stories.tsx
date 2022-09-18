import { ButtonGroup as ChakraButtonGroup } from './index';
import ButtonGroup from './ButtonGroup';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../../Atoms';

export default {
   title: 'Module/ButtonGroup',
   component: ButtonGroup,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof ButtonGroup>;

export const Template: ComponentStory<typeof ChakraButtonGroup> = args => (
   <ChakraButtonGroup {...args}>
      <Button>
         <span>Button 1</span>
      </Button>
      <Button variant="primary-border">
         <span>Button 2</span>
      </Button>
      <Button>
         <span>Button 3</span>
      </Button>
   </ChakraButtonGroup>
);

export const Gap = Template.bind({});

Gap.args = {
   gap: '10',
};

export const Icon: ComponentStory<typeof ButtonGroup> = args => (
   <ChakraButtonGroup {...args} withIcon>
      <div>$</div>
      <Button bg="transparent" color="red">
         <span>Button 1</span>
      </Button>
   </ChakraButtonGroup>
);
