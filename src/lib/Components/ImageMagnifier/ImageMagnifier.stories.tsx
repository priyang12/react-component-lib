import ImageMagnifier from './ImageMagnifier';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Components/ImageMagnifier',
   component: ImageMagnifier,
   args: {
      width: '500px',
      src: 'https://picsum.photos/600/600',
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof ImageMagnifier>;

export const Template: StoryFn<typeof ImageMagnifier> = (args) => (
   <ImageMagnifier
      style={{
         width: '50%',
      }}
      {...args}
   />
);
