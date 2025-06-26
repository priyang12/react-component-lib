import type { Meta, StoryFn } from '@storybook/react';
import Loader from './Loader';

export default {
   title: 'Helper/Loader',
   component: Loader,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Loader>;

export const Template: StoryFn<typeof Loader> = (args) => <Loader {...args} />;
export const Text: StoryFn<typeof Loader> = (args) => (
   <Loader loadingText="Loading..." {...args} />
);
export const CustomSize: StoryFn<typeof Loader> = (args) => (
   <Loader
      style={{
         width: '100px',
         height: '100px',
      }}
      {...args}
   />
);
