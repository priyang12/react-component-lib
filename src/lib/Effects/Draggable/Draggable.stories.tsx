import Draggable from './Draggable';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

export default {
   title: 'Effects/Draggable',
   component: Draggable,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Draggable>;

export const Template: ComponentStory<typeof Draggable> = args => {
   const [isDragging, setIsDragging] = React.useState(false);
   return (
      <Draggable
         {...args}
         isDragging={isDragging}
         setIsDragging={setIsDragging}
      >
         <div>
            {/* <div p="2rem" w="50%" bg="#333" color="#fff"> */}
            <div>Draggable</div>
         </div>
      </Draggable>
   );
};

export const ParentContainer: ComponentStory<typeof Draggable> = args => {
   const [isDragging, setIsDragging] = React.useState(false);
   const parentContainer = React.useRef<HTMLAnchorElement>(null);
   return (
      <article ref={parentContainer}>
         <Draggable
            {...args}
            parentContainerRef={parentContainer}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
         >
            <div>
               {/* <div p="2rem" w="fit-content" bg="#333" color="#fff"> */}
               <div>Draggable</div>
            </div>
         </Draggable>
      </article>
   );
};
