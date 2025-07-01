import type { Meta, StoryFn } from '@storybook/react';
import Skeleton from './Skeleton';

export default {
   title: 'Helper/Skeleton',
   component: Skeleton,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Skeleton>;

export const Template: StoryFn<typeof Skeleton> = (args) => (
   <Skeleton {...args} />
);
export const Multiple: StoryFn<typeof Skeleton> = (args) => (
   <div className="flex flex-col gap-5">
      <Skeleton
         style={{
            width: '400px',
            height: '10px',
            borderRadius: '10px',
         }}
         {...args}
      />
      <Skeleton
         style={{
            width: '400px',
            height: '10px',
            borderRadius: '10px',
         }}
         {...args}
      />
      <Skeleton
         style={{
            width: '400px',
            height: '10px',
            borderRadius: '10px',
         }}
         {...args}
      />
   </div>
);
