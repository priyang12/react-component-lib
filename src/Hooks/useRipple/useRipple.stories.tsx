import { Meta, StoryObj } from '@storybook/react';
import { useRipple } from './useRipple';
import '../../lib/Components/Button/Button.scss';

export default {
   title: 'Hooks/useRipple',
   decorators: [
      (Story) => (
         <div className="container">
            <Story />
         </div>
      ),
   ],
   component: Default,
} satisfies Meta<typeof Default>;

type Story = StoryObj<typeof Default>;

export function RippleDemo() {
   let duration;
   const { ref, createRipple } = useRipple(
      { show: true, bgColor: 'red' },
      (duration = 500)
   );

   return (
      <button
         ref={ref}
         onClick={createRipple}
         className="relative overflow-hidden px-5 py-2 bg-slate-100 cursor-pointer z-10"
         //  you need to import the Button.css which contain .ripple class style or global.css
         style={{
            border: '1px solid #ccc',
         }}
      >
         Click Me
      </button>
   );
}
export function Default({
   show,
   bgColor,
   duration,
}: {
   show: boolean;
   bgColor?: string;
   duration?: number;
}) {
   const { ref, createRipple } = useRipple({ show, bgColor }, duration);

   return (
      <button
         ref={ref}
         onClick={createRipple}
         className="relative overflow-hidden px-5 py-2 bg-slate-100 cursor-pointer z-10"
         style={{
            border: '1px solid #ccc',
         }}
      >
         Click Me
      </button>
   );
}

export const CustomColor: Story = {
   args: {
      show: true,
      bgColor: 'rgba(0, 150, 255, 0.4)',
      duration: 700,
   },
};

export const Disabled: Story = {
   args: {
      show: false,
   },
};
