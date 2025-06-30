import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useDeferredValue } from './useDeferredValue';
import { FormControl } from '../../lib/Components/FormControl';
import { Input } from '../../lib/Components/Input';
import { Label } from '../../lib/Components/Label';

export default {
   title: 'Hooks/useDeferredValue',
   component: DeferredValueDemo,
   argTypes: {
      delay: {
         control: { type: 'number' },
         description: 'Delay in milliseconds before value updates',
      },
   },
   args: {
      delay: 1000,
   },
} satisfies Meta<typeof DeferredValueDemo>;

type Story = StoryObj<typeof DeferredValueDemo>;

export function DeferredValueDemo({ delay }: { delay: number }) {
   const [input, setInput] = React.useState('');
   const deferred = useDeferredValue({
      originalState: input,
      delay,
      initialValue: '',
   });

   console.log(deferred);

   return (
      <div
         style={{
            fontFamily: 'monospace',
            padding: 16,
            color: 'var(--text-primary)',
         }}
      >
         <FormControl>
            <Label>Type here: </Label>
            <Input
               InputSize="medium"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               style={{
                  fontSize: 16,
                  padding: 4,
                  width: 200,
                  marginBottom: 16,
               }}
            />
         </FormControl>

         <div style={{ marginTop: 12 }}>
            <div>
               <strong>Input (live):</strong> {input}
            </div>
            <div>
               <strong>Deferred:</strong> {deferred}
            </div>
            <p style={{ fontSize: 12, color: '#666' }}>
               Deferred value updates after <b>{delay}ms</b> of delay.
            </p>
         </div>
      </div>
   );
}

export const Default: Story = {};

export const FastDelay: Story = {
   args: {
      delay: 300,
   },
};

export const SlowDelay: Story = {
   args: {
      delay: 2000,
   },
};
