import type { Meta, StoryFn } from '@storybook/react';
import VisuallyHidden from './VisuallyHidden';
import { Input } from '../Input';
import { Label } from '../Label';
import { FormControl } from '../FormControl';

export default {
   title: 'Helper/VisuallyHidden',
   component: VisuallyHidden,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof VisuallyHidden>;

export const Template: StoryFn<typeof VisuallyHidden> = (args) => (
   <FormControl {...args}>
      <Label htmlFor="Search" size="medium">
         Search
      </Label>
      <VisuallyHidden {...args}>
         <Input type="text" id="Search" InputSize="medium" />
      </VisuallyHidden>
   </FormControl>
);
export const AsChild: StoryFn<typeof VisuallyHidden> = (args) => (
   <FormControl {...args}>
      <Label htmlFor="Search" size="medium">
         Search
      </Label>
      <VisuallyHidden {...args} asChild>
         <Input type="text" id="Search" InputSize="medium" />
      </VisuallyHidden>
   </FormControl>
);
export const Focusable: StoryFn<typeof VisuallyHidden> = (args) => (
   <div className="flex gap-5 text-[var(--text-primary)] relative">
      <div>Navbar</div>
      <VisuallyHidden isFocusable asChild {...args}>
         <a href="#ID">Skip Navigation</a>
      </VisuallyHidden>
   </div>
);
