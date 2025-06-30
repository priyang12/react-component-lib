import { Meta, StoryObj } from '@storybook/react';
import { useCounter } from './useCounter';
import { Divider } from '../../lib/Components/Divider';

export default {
   title: 'Hooks/useCounter',
   component: Default,
   argTypes: {
      initialCount: { control: { type: 'number' } },
      min: { control: { type: 'number' } },
      max: { control: { type: 'number' } },
   },
   args: {
      initialCount: 0,
      min: 0,
      max: 10,
   },
   decorators: [
      (Story) => (
         <div className="container">
            <Story />
         </div>
      ),
   ],
} satisfies Meta<typeof Default>;

type Story = StoryObj<typeof Default>;

export function CounterDemo() {
   const {
      Count,
      PreviousState,
      NextState,
      Increment,
      Decrement,
      resetCounter,
      RoundIncrement,
      RoundDecrement,
      restToZero,
   } = useCounter(0, { min: 0, max: 5 });

   return (
      <div
         style={{
            fontFamily: 'monospace',
            padding: 16,
            color: 'var(--text-primary)',
         }}
      >
         <div style={{ marginBottom: 8 }}>
            <strong>Current:</strong> {Count} <br />
            <strong>Previous:</strong> {PreviousState} <br />
            <strong>Next:</strong> {NextState}
         </div>
         <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={Decrement}>-</button>
            <button onClick={Increment}>+</button>
            <Divider />
            <button onClick={RoundDecrement}>⟲ -</button>
            <button onClick={RoundIncrement}>+ ⟳</button>
            <Divider />
            <button onClick={resetCounter}>Reset</button>
            <button onClick={restToZero}>Reset to Zero</button>
         </div>
      </div>
   );
}

export function Default({
   initialCount,
   min,
   max,
}: {
   initialCount: number;
   min: number;
   max: number;
}) {
   const {
      Count,
      PreviousState,
      NextState,
      Increment,
      Decrement,
      resetCounter,
      RoundIncrement,
      RoundDecrement,
      restToZero,
   } = useCounter(initialCount, { min, max });

   return (
      <div
         style={{
            fontFamily: 'monospace',
            padding: 16,
            color: 'var(--text-primary)',
         }}
      >
         <div style={{ marginBottom: 8 }}>
            <strong>Current:</strong> {Count} <br />
            <strong>Previous:</strong> {PreviousState} <br />
            <strong>Next:</strong> {NextState}
         </div>
         <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={Decrement}>-</button>
            <button onClick={Increment}>+</button>
            <Divider />
            <button onClick={RoundDecrement}>⟲ -</button>
            <button onClick={RoundIncrement}>+ ⟳</button>
            <Divider />
            <button onClick={resetCounter}>Reset</button>
            <button onClick={restToZero}>Reset to Zero</button>
         </div>
      </div>
   );
}

export const StartAt5WithinRange: Story = {
   args: {
      initialCount: 5,
      min: 0,
      max: 10,
   },
};

export const WithLoopingEnabled: Story = {
   args: {
      initialCount: 10,
      min: 1,
      max: 10,
   },
};

export const NoMinMax: Story = {
   args: {
      initialCount: 100,
      min: null as any, // Storybook control hack
      max: null as any,
   },
};
