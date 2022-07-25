import ButtonGroup from './index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../../components';

export default {
   title: 'Module/ButtonGroup',
   component: ButtonGroup,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof ButtonGroup>;

export const Template: ComponentStory<typeof ButtonGroup> = args => (
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

Gap.args = {
   gap: '10',
};

export const Icon: ComponentStory<typeof ButtonGroup> = args => (
   <ButtonGroup {...args} withIcon>
      <div>$</div>
      <Button bg="transparent" color="red">
         <span>Button 1</span>
      </Button>
   </ButtonGroup>
);
