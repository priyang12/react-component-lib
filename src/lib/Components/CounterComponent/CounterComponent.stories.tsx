import Counter from './Counter';
import CounterComponent from './CounterComponent';
import type { Meta, StoryFn } from '@storybook/react';

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

export const standAloneCounter: StoryFn<typeof Counter> = (args) => (
   <Counter
      {...{
         Count: 3,
         PreviousState: 0,
         initialValue: 0,
      }}
      {...args}
   />
);
standAloneCounter.storyName = 'Single Counter';
