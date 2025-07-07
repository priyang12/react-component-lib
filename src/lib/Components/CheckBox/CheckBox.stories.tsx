import * as React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import CheckBox from './CheckBox';

export default {
   title: 'Components/CheckBox',
   component: CheckBox,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof CheckBox>;

export const Template: StoryFn<typeof CheckBox> = (args) => (
   <CheckBox {...args} checked />
);

export const Controlled: StoryFn<typeof CheckBox> = (args) => {
   const [isChecked, setIsChecked] = React.useState(false);
   return (
      <CheckBox
         checked={isChecked}
         onChange={(e) => setIsChecked(e.target.checked)}
         {...args}
      />
   );
};
