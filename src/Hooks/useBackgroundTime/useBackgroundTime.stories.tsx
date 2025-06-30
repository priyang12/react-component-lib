import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useBackgroundTime } from './useBackgroundTime';

export default {
   title: 'Hooks/useBackgroundTime',
   component: BackgroundTimeDemo,
} satisfies Meta<typeof BackgroundTimeDemo>;

type Story = StoryObj<typeof BackgroundTimeDemo>;

export function BackgroundTimeDemo() {
   const { time, seconds } = useBackgroundTime();

   return (
      <div style={{ fontFamily: 'monospace', padding: 16 }}>
         <p>
            <strong>Start Time:</strong> {time.toLocaleTimeString()}
         </p>
         <p>
            <strong>Elapsed Seconds:</strong> {seconds}
         </p>
         <p>
            Switch to another tab and come back to see how it handles visibility
            changes.
         </p>
      </div>
   );
}
