import * as React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import PopOver from './PopOver';
import { Button } from '../Button';
import { IoFilterOutline } from 'react-icons/io5';

export default {
   title: 'Components/PopOver',
   component: PopOver.Container,
   subcomponents: PopOver,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof PopOver.Container>;

export const Template: StoryFn<typeof PopOver.Container> = (args) => {
   return (
      <PopOver.Container isFlip={true} {...args}>
         <PopOver.Trigger trigger={['focus', 'click']}>
            <Button>
               <IoFilterOutline /> Filter
            </Button>
         </PopOver.Trigger>
         <PopOver.Portal>
            <PopOver.Content className="w-1/2">
               <div className="flex flex-col bg-[var(--bg-surface)] p-4 rounded-lg z-30 space-y-4 ">
                  <PopOver.Arrow />
                  <PopOver.Close className="absolute top-2 right-2" />
                  <PopOver.Header className="text-lg font-semibold text-[var(--text-primary)]">
                     Popover Title
                  </PopOver.Header>
                  <div className="text-[var(--text-primary)] text-sm">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Debitis placeat labore impedit in saepe, atque tempora
                     aspernatur consequuntur iure unde velit odio nulla harum
                     mollitia rerum quo adipisci ipsam sequi.
                  </div>

                  <PopOver.Footer>
                     {({ setContentState }) => (
                        <div className="flex justify-end space-x-2">
                           <button
                              onClick={() => setContentState(false)}
                              className="px-3 py-1 bg-gray-200 rounded"
                           >
                              Cancel
                           </button>
                           <button className="px-3 py-1 bg-blue-600 text-white rounded">
                              Confirm
                           </button>
                        </div>
                     )}
                  </PopOver.Footer>
               </div>
            </PopOver.Content>
         </PopOver.Portal>
      </PopOver.Container>
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
                  <PopOver.Close className="" />
               </div>
            </PopOver.Content>
         </PopOver.Portal>
      </PopOver.Container>
   );
};
