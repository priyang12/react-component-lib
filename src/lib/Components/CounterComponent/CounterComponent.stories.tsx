import CounterComponent from './CounterComponent';
import type { Meta, StoryFn } from '@storybook/react';

const Counter = CounterComponent.Counter;
const CounterControls = CounterComponent.CounterControls;

export default {
   title: 'Components/CounterComponent',
   component: CounterControls,
   decorators: [
      (Story) => (
         <div className="container">
            <Story
               args={{
                  renderCounter(ref, Count, PreviousState) {
                     return (
                        <Counter
                           Count={Count}
                           PreviousState={PreviousState}
                           ref={ref}
                        />
                     );
                  },
               }}
            />
         </div>
      ),
   ],
} as Meta<typeof CounterControls>;

export const CounterControl: StoryFn<typeof CounterControls> = (args) => (
   <CounterControls {...args} />
);

export const SingleCounter: StoryFn<typeof Counter> = (args) => (
   <Counter
      {...{
         Count: 1,
         PreviousState: 0,
         initialValue: 0,
      }}
   />
);
SingleCounter.storyName = 'Single Counter';
