import { render } from '@testing-library/react';
import PopOver from './PopOver';

it('renders without crashing', () => {
   render(
      <PopOver.Container isFlip={true}>
         <PopOver.Trigger trigger={['focus', 'click']}>Filter</PopOver.Trigger>
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
});
