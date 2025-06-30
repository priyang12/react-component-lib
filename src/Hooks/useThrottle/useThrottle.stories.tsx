import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useThrottle } from './useThrottle';
import { FormControl } from '../../lib/Components/FormControl';
import { Input } from '../../lib/Components/Input';
import { Label } from '../../lib/Components/Label';

export default {
   title: 'Hooks/useThrottle',
   component: ThrottleDemo,
   argTypes: {
      delay: {
         control: { type: 'number' },
         defaultValue: 500,
         description: 'Throttle delay in milliseconds',
      },
   },
   args: {
      delay: 500,
   },
} satisfies Meta<typeof ThrottleDemo>;

type Story = StoryObj<typeof ThrottleDemo>;

export function ThrottleDemo({ delay }: { delay: number }) {
   const [input, setInput] = React.useState('');
   const throttledInput = useThrottle(input, delay);

   React.useEffect(() => {
      console.log('Throttled input:', throttledInput);
   }, [throttledInput]);

   return (
      <div
         style={{
            padding: 16,
            fontFamily: 'monospace',
            color: 'var(--text-primary)',
         }}
      >
         <FormControl>
            <Label>Type something:</Label>
            <Input
               InputSize="medium"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               style={{
                  fontFamily: 'inherit',
                  fontSize: 16,
                  padding: 4,
                  marginBottom: 16,
                  width: 200,
               }}
            />
         </FormControl>
         <div style={{ marginTop: 16 }}>
            <div>
               <strong>Raw input:</strong> {input}
            </div>
            <div>
               <strong>Throttled input:</strong> {throttledInput}
            </div>
            <div style={{ fontSize: 12, marginTop: 8, color: '#555' }}>
               Try typing fast — the throttled value updates every{' '}
               <b>{delay}ms</b>.
            </div>
         </div>
      </div>
   );
}

export const Default: Story = {};

export const FastThrottle: Story = {
   args: {
      delay: 200,
   },
};

export const SlowThrottle: Story = {
   args: {
      delay: 1000,
   },
};
