import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useElementVisibility } from './useElementVisibility';

export default {
   title: 'Hooks/useElementVisibility',
   component: VisibilityDemo,
   parameters: {
      layout: 'fullscreen',
   },
} satisfies Meta<typeof VisibilityDemo>;

type Story = StoryObj<typeof VisibilityDemo>;

export function VisibilityDemo({
   threshold = 0.5,
   rootMargin = '0px',
}: {
   threshold?: number;
   rootMargin?: string;
}) {
   const ref = React.useRef<HTMLDivElement>(null);
   const isVisible = useElementVisibility(ref, {
      threshold,
      rootMargin,
   });

   return (
      <div style={{ height: '100vh', padding: 20 }}>
         <p>Scroll down to see the box. Visibility will be tracked.</p>

         <div style={{ height: '50vh' }} />

         <div
            ref={ref}
            style={{
               height: 200,
               backgroundColor: isVisible ? '#d1e7dd' : '#f8d7da',
               transition: 'background-color 0.3s ease',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               fontSize: 18,
               fontWeight: 'bold',
               border: '1px solid #ccc',
            }}
         >
            {isVisible ? '✅ Visible in viewport' : '❌ Not visible'}
         </div>

         <div style={{ height: '100vh' }} />
      </div>
   );
}

export const Default: Story = {
   args: {
      threshold: 0.5,
      rootMargin: '0px',
   },
};

export const CustomThreshold: Story = {
   args: {
      threshold: 0.1,
   },
};

export const WithRootMargin: Story = {
   args: {
      threshold: 0,
      rootMargin: '100px',
   },
};
