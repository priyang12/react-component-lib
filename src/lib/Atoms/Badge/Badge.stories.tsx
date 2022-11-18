import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BadgeContainer, Badge } from './Badge';

export default {
   title: 'Atoms/Badge',
   component: Badge,
   args: {
      BadgeContent: '1',
   },
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Badge>;

export const Template: ComponentStory<typeof Badge> = args => (
   <BadgeContainer className="x">
      <Badge {...args} />
      <div
         className="p-5"
         style={{
            border: '1px solid black',
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
