import React from 'react';
import Counter from './Counter';
import type { Meta, StoryFn } from '@storybook/react';

export default {
   title: 'Atoms/Counter',
   component: Counter,
   args: {
      initialValue: 0,
      Count: 0,
      PreviousState: 0,
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Counter>;

export const Template: StoryFn<typeof Counter> = (args) => {
   const ref: any = React.createRef();
   return <Counter ref={ref} {...args} />;
};
