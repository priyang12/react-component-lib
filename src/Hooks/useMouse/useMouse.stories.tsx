import { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useMouse } from './useMouse';

export default {
   title: 'Hooks/useMouse',
   component: MouseTrackerDemo,
   argTypes: {
      useRefTarget: {
         control: 'boolean',
         description:
            'Track mouse within specific ref element instead of the whole document.',
      },
   },
   args: {
      useRefTarget: true,
   },
} satisfies Meta<typeof MouseTrackerDemo>;

type Story = StoryObj<typeof MouseTrackerDemo>;

export function MouseTrackerDemo({ useRefTarget }: { useRefTarget: boolean }) {
   const ref = React.useRef<HTMLDivElement>(null);
   const { x, y } = useMouse(useRefTarget ? ref : { current: null });

   return (
      <div style={{ padding: 32 }}>
         <p>
            {useRefTarget
               ? 'Mouse position is tracked within the box below.'
               : 'Mouse position is tracked globally across the page.'}
         </p>

         <div
            ref={useRefTarget ? ref : undefined}
            style={{
               height: 300,
               border: '2px dashed #aaa',
               backgroundColor: '#f9f9f9',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               marginTop: 20,
               position: 'relative',
            }}
         >
            <div
               style={{
                  fontFamily: 'monospace',
                  fontSize: 18,
               }}
            >
               x: {x} | y: {y}
            </div>
         </div>
      </div>
   );
}

export const InsideElement: Story = {
   args: {
      useRefTarget: true,
   },
};

export const GlobalTracking: Story = {
   args: {
      useRefTarget: false,
   },
};
