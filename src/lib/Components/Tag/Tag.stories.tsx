import type { Meta, StoryFn } from '@storybook/react';
import { AiOutlineCloseCircle, AiOutlineCamera } from 'react-icons/ai';
import Tag from './Tag';

export default {
   title: 'Helper/Tag',
   component: Tag,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Tag>;

export const Template: StoryFn<typeof Tag> = (args) => (
   <div className="flex gap-5">
      <Tag {...args}>Tag</Tag> <Tag {...args}>Tag</Tag> <Tag {...args}>Tag</Tag>
   </div>
);
export const NoBorder = Template.bind({});
NoBorder.args = {
   style: {
      border: 0,
   },
};
export const Close: StoryFn<typeof Tag> = (args) => (
   <Tag closeIcon={true} {...args}>
      Tag
   </Tag>
);
export const CloseIcon: StoryFn<typeof Tag> = (args) => (
   <Tag
      closeIcon={<AiOutlineCloseCircle />}
      onClose={() => console.log('close')}
      {...args}
   >
      Tag
   </Tag>
);

export const FrontIcon: StoryFn<typeof Tag> = (args) => (
   <Tag
      icon={
         <span role="img" aria-label="Camera" tabIndex={-1}>
            <AiOutlineCamera />
         </span>
      }
      {...args}
   >
      Tag
   </Tag>
);
