import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import PopOver from './PopOver';
import { IoFilterOutline } from 'react-icons/io5';
import { Button } from '../Button';
import { useFloating } from '@floating-ui/react';

export default {
   title: 'Components/PopOver',
   component: PopOver.Container,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof PopOver.Container>;

export const Template: StoryFn<typeof PopOver.Container> = (args) => {
   const { refs, floatingStyles } = useFloating();
   return (
      <PopOver.Container ref={refs.setReference} {...args}>
         <PopOver.Trigger>
            <Button>
               <IoFilterOutline /> Open Filter
            </Button>
         </PopOver.Trigger>
         <PopOver.PopOverPortal>
            <PopOver.Content>
               <div
                  className="flex bg-slate-100 w-1/2 p-4 rounded-lg"
                  ref={refs.setFloating}
                  style={floatingStyles}
               >
                  <div>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Debitis placeat labore impedit in saepe, atque tempora
                     aspernatur consequuntur iure unde velit odio nulla harum
                     mollitia rerum quo adipisci ipsam sequi.
                  </div>
                  <PopOver.Close />
               </div>
            </PopOver.Content>
         </PopOver.PopOverPortal>
      </PopOver.Container>
   );
};

export const defaultOpen: StoryFn<typeof PopOver.Container> = Template.bind({});
defaultOpen.args = {
   defaultIsOpen: true,
};

export const witCustomRef: StoryFn<typeof PopOver.Container> = (args) => {
   const ref = useRef(null);
   const [container, setContainer] = useState<any>();
   useEffect(() => {
      setContainer(ref.current);
   }, []);

   return (
      <PopOver.Container ref={ref} {...args}>
         <PopOver.Trigger>
            <Button>
               <IoFilterOutline /> Open Filter
            </Button>
         </PopOver.Trigger>
         <PopOver.PopOverPortal container={container}>
            <PopOver.Content>
               <div className="flex bg-slate-100">
                  <div className="text-red-600">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Debitis placeat labore impedit in saepe, atque tempora
                     aspernatur consequuntur iure unde velit odio nulla harum
                     mollitia rerum quo adipisci ipsam sequi.
                  </div>
                  <PopOver.Close />
               </div>
            </PopOver.Content>
         </PopOver.PopOverPortal>
      </PopOver.Container>
   );
};
