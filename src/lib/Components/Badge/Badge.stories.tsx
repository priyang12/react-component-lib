import type { Meta, StoryFn } from '@storybook/react';
import { BadgeContainer, Badge } from './index';

export default {
   title: 'Components/Badge',
   component: Badge,
   args: {
      BadgeContent: '1',
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Badge>;

export const StandAloneBadge: StoryFn<typeof Badge> = (args) => (
   <Badge {...args} />
);

export const Template: StoryFn<typeof Badge> = (args) => (
   <BadgeContainer>
      <div className="p-5 border-2 border-solid border-red-400 bg-gray-200">
         <Badge {...args} />
         <p>container</p>
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
   showOnHover: false,
};

export const ShowOnHover = Template.bind({});
ShowOnHover.args = {
   BadgeContent: 123456,
   Max: 5,
   showOnHover: true,
};

export const Larger: StoryFn<typeof Badge> = (args) => (
   <BadgeContainer>
      <div className="p-5 border-2 border-solid border-red-400 bg-gray-200">
         <Badge {...args} />
         <h1>container</h1>
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            esse exercitationem quam iste tempore qui animi voluptate ipsam
            mollitia molestiae ex corrupti, fuga modi amet ducimus dolor non
            eligendi optio.
         </p>
      </div>
   </BadgeContainer>
);
