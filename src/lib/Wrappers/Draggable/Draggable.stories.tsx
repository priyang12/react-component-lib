import Draggable from './Draggable';
import type { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { useDraggable } from './Hooks/useDraggble';

export default {
   title: 'Wrappers/Draggable',
   component: Draggable,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Draggable>;

export const Template: StoryFn<typeof Draggable> = (args) => {
   return (
      <Draggable {...args}>
         <div className="text-red-700 m-5 p-5 bg-gray-300">Draggable Box</div>
      </Draggable>
   );
};

export const ParentContainer: StoryFn<typeof Draggable> = (args) => {
   const parentContainer = React.useRef<HTMLAnchorElement>(null);
   return (
      <article
         ref={parentContainer}
         className="border-2 border-blue-500 border-solid w-full h-screen"
      >
         <Draggable {...args} parentContainerRef={parentContainer}>
            <div className="text-red-700 m-5 p-5 bg-gray-300 w-1/4">
               Inside Parent Container Box
            </div>
         </Draggable>
      </article>
   );
};

export const withHook = () => {
   const { position, ref: DragRef } = useDraggable();
   return (
      <div
         className="text-red-700 m-5 p-5 bg-gray-300"
         ref={DragRef}
         style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            cursor: 'grab',
         }}
      >
         Draggable Box
      </div>
   );
};
