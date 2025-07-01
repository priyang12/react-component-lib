import * as React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import PopOver from './PopOver';
import { IoFilterOutline } from 'react-icons/io5';
import { Button } from '../Button';

export default {
   title: 'Components/PopOver',
   component: PopOver.Container,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof PopOver.Container>;

export const Template: StoryFn<typeof PopOver.Container> = (args) => {
   return (
      <div
         style={{
            height: '150vh',
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
         }}
      >
         <PopOver.Container isFlip={true} {...args}>
            <PopOver.Trigger>
               <Button>
                  <IoFilterOutline /> Filter
               </Button>
            </PopOver.Trigger>
            <PopOver.Portal>
               <PopOver.Content asChild>
                  <div className="flex bg-[var(--bg-surface)] w-1/2 p-4 rounded-lg z-30">
                     <PopOver.Arrow />
                     <div className="text-[var(--text-primary)]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Debitis placeat labore impedit in saepe, atque tempora
                        aspernatur consequuntur iure unde velit odio nulla harum
                        mollitia rerum quo adipisci ipsam sequi.
                     </div>
                     <PopOver.Close />
                  </div>
               </PopOver.Content>
            </PopOver.Portal>
         </PopOver.Container>
      </div>
   );
};

export const defaultOpen: StoryFn<typeof PopOver.Container> = Template.bind({});
defaultOpen.args = {
   defaultIsOpen: true,
};

export const witCustomRef: StoryFn<typeof PopOver.Container> = (args) => {
   const ref = React.useRef(null);
   const [container, setContainer] = React.useState<any>();
   React.useEffect(() => {
      setContainer(ref.current);
   }, []);

   return (
      <PopOver.Container ref={ref} {...args}>
         <PopOver.Trigger>
            <Button>
               <IoFilterOutline /> Open Filter
            </Button>
         </PopOver.Trigger>
         <PopOver.Portal container={container}>
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
         </PopOver.Portal>
      </PopOver.Container>
   );
};
