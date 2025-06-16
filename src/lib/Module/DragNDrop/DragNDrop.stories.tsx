import DragNDrop from './DragNDrop';
import type { Meta, StoryFn } from '@storybook/react';
import { GradientHover } from '../../Effects/GradientHover';
import React from 'react';

export default {
   title: 'Module/DragNDrop',
   component: DragNDrop,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof DragNDrop>;

const onUploadFN = (files: FileList) => {
   console.log(files);
};
const dropdowncontainerref = React.createRef<HTMLInputElement>();

export const Template: StoryFn<typeof DragNDrop> = (args) => (
   <GradientHover
      borderRadius="50%"
      _hover={{
         padding: '20px',
      }}
   >
      <DragNDrop
         {...args}
         onUpload={onUploadFN}
         dropdowncontainerref={dropdowncontainerref}
         unstyled={false}
         display="flex"
         flexDir="column"
      >
         <div>Drag and drop a file here </div>
         <div>Or Select</div>
         <input type="file" name="file" id="File" />
      </DragNDrop>
   </GradientHover>
);

export const OverLayComponent = Template.bind({});

OverLayComponent.args = {
   OverLayComponent: <div>asdasd</div>,
};

export const UnStyled: StoryFn<typeof DragNDrop> = (args) => (
   <DragNDrop
      {...args}
      onUpload={onUploadFN}
      dropdowncontainerref={dropdowncontainerref}
      unstyled={true}
      display="flex"
      flexDir="column"
      bg="#333"
      color="#fff"
      p={50}
   >
      <div>Drag and drop a file here </div>
      <div>Or Select</div>
      <input type="file" name="file" id="File" />
   </DragNDrop>
);
