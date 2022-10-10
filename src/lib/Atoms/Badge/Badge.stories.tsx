import { ComponentStory, ComponentMeta } from '@storybook/react';
import { STORYBOOK_EXCLUDE_CHAKRA_PROPS } from '../../Utils/ChakraExlude';
import { BadgeContainer, Badge } from './Badge';

export default {
   title: 'Atoms/Badge',
   component: Badge,
   args: {
      BadgeContent: '1',
   },
   argTypes: STORYBOOK_EXCLUDE_CHAKRA_PROPS,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Badge>;

export const Template: ComponentStory<typeof Badge> = args => (
   <BadgeContainer>
      <Badge {...args} />
      <div
         style={{
            border: '1px solid black',
            padding: '10px',
         }}
      >
         Container
      </div>
   </BadgeContainer>
);

export const Variant = Template.bind({});

Variant.args = {
   variant: 'primary',
};

export const AnchorOrigin = Template.bind({});
AnchorOrigin.args = {
   anchorOriginVertical: 'bottom',
   anchorOriginHorizontal: 'left',
};

export const MaxBadge = Template.bind({});
MaxBadge.args = {
   BadgeContent: 123456,
   Max: 5,
};

export const ShowOnHover = Template.bind({});
ShowOnHover.args = {
   BadgeContent: 123456,
   Max: 5,
   showOnHover: true,
};
