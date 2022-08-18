import DragNDrop from './index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GradientHover } from '../../Effects';
import { Button } from '../../Atoms';

export default {
   title: 'Module/DragNDrop',
   component: DragNDrop,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof DragNDrop>;

export const Template: ComponentStory<typeof DragNDrop> = args => (
   <GradientHover
      borderRadius="50%"
      _hover={{
         padding: '20px',
      }}
   >
      <DragNDrop {...args}>
         <div>Drag and drop a file here</div>
         <input type="file" name="file" id="file" />
      </DragNDrop>
   </GradientHover>
);
