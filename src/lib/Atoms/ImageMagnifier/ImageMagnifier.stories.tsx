import ImageMagnifier from './ImageMagnifier';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
   title: 'Atoms/ImageMagnifier',
   component: ImageMagnifier,
   args: {
      width: '500px',
      src: 'https://source.unsplash.com/yeFJNtA3604',
   },
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof ImageMagnifier>;

export const Template: ComponentStory<typeof ImageMagnifier> = args => (
   <ImageMagnifier
      style={{
         width: '50%',
      }}
      {...args}
   />
);
