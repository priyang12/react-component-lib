import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DragNDrop from './DragNDrop';
import DefaultContainer from './DefaultContainer';

const meta: Meta<typeof DragNDrop> = {
   title: 'Components/DragNDrop',
   component: DragNDrop,
   subcomponents: {
      DefaultContainer,
   },
};

export default meta;
type Story = StoryObj<typeof DragNDrop>;

export const Default: Story = {
   args: {
      onDropFile: (file: File) => alert(`File dropped: ${file.name}`),
   },
};

export const showInput: Story = {
   args: {
      onDropFile: (file: File) => alert(`File dropped: ${file.name}`),
      defaultContainerProps: {
         inputHidden: false,
         id: 'CustomID',
      },
   },
};

export const WithModifiedDefaultContainer: Story = {
   args: {
      onDropFile: (file: File) => alert(`You uploaded: ${file.name}`),
      renderDropContainer: () => (
         <DefaultContainer
            text="Drop your file here or click to select"
            inputHidden={false}
            onFileSelect={(file) => alert(`File selected: ${file.name}`)}
         />
      ),
   },
};

export const CustomContainerWithDragState: Story = {
   args: {
      onDropFile: (file: File) => alert(`Dropped file: ${file.name}`),
      renderDropContainer: ({ isDragging }) => (
         <div
            className={`border-2 border-dashed rounded-lg p-8 text-center font-medium transition-colors duration-200 ${
               isDragging
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-gray-100 text-gray-800'
            }`}
         >
            {isDragging
               ? '📥 Drop the file!'
               : '🧩 Drag a file here (input is disabled in this story)'}
         </div>
      ),
   },
};

export const CustomWithLabelInput: Story = {
   render: (args) => {
      const inputRef = React.useRef<HTMLInputElement>(null);

      const handleFileClick = () => {
         inputRef.current?.click(); // Open native file picker
      };

      return (
         <div className="flex flex-col items-center">
            <DragNDrop
               {...args}
               renderDropContainer={({ isDragging }) => (
                  <label htmlFor="file-upload" onClick={handleFileClick}>
                     {isDragging
                        ? '📥 Drop your file'
                        : '🧩 Drag or click to upload'}
                  </label>
               )}
            />
            <input
               id="file-upload"
               type="file"
               ref={inputRef}
               style={{ display: 'none' }}
               onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                     args.onDropFile?.(file);
                  }
               }}
            />

            <button
               onClick={handleFileClick}
               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
               Upload File
            </button>
         </div>
      );
   },
};
