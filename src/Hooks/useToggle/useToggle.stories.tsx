import { Meta, StoryObj } from '@storybook/react';
import { useToggle } from './useToggle';

export default {
   title: 'Hooks/useToggle',
   component: Default,
} satisfies Meta<typeof Default>;

type Story = StoryObj<typeof Default>;

export function DemoHook() {
   const { value, toggleValue, setToggleValue } = useToggle(false);

   return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
         <p>
            Current value: <strong>{value ? 'true' : 'false'}</strong>
         </p>
         <button onClick={toggleValue}>Toggle</button>
         <button onClick={() => setToggleValue(true)}>Set true</button>
         <button onClick={() => setToggleValue(false)}>Set false</button>
      </div>
   );
}

export function Default({ initialValue = false }: { initialValue: boolean }) {
   const { value, toggleValue, setToggleValue } = useToggle(initialValue);

   return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
         <p>
            Current value: <strong>{value ? 'true' : 'false'}</strong>
         </p>
         <button onClick={toggleValue}>Toggle</button>
         <button onClick={() => setToggleValue(true)}>Set true</button>
         <button onClick={() => setToggleValue(false)}>Set false</button>
      </div>
   );
}

export const InitiallyTrue: Story = {
   args: {
      initialValue: true,
   },
};
