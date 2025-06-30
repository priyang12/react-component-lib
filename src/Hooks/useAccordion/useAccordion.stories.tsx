import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useAccordion, AccordionReducer } from './useAccordion';

const items = [
   { title: 'Section 1', content: 'Content for section 1' },
   { title: 'Section 2', content: 'Content for section 2' },
   { title: 'Section 3', content: 'Content for section 3' },
];

export const HookDemo: StoryFn = () => {
   const { openIndexes, toggle } = useAccordion({
      initialOpenIndexes: [],
      CustomReducer: AccordionReducer,
   });

   return (
      <div>
         {items.map((item, index) => (
            <div
               key={index}
               style={{ border: '1px solid #ccc', marginBottom: 8 }}
            >
               <button
                  onClick={() => toggle(index)}
                  style={{ width: '100%', padding: 8, textAlign: 'left' }}
               >
                  {item.title}
               </button>
               {openIndexes.includes(index) && (
                  <div style={{ padding: 8 }}>{item.content}</div>
               )}
            </div>
         ))}
      </div>
   );
};

export default {
   title: 'Hooks/useAccordion',
   component: Default,
} satisfies Meta<typeof Default>;

type Story = StoryObj<typeof Default>;
export function Default({
   initialOpenIndexes,
   oneAtATime,
}: {
   initialOpenIndexes: number[];
   oneAtATime: boolean;
}) {
   const { openIndexes, toggle, OneAlwaysOpen } = useAccordion({
      initialOpenIndexes: initialOpenIndexes ?? [],
      CustomReducer: AccordionReducer,
   });

   const handleClick = (index: number) => {
      oneAtATime ? OneAlwaysOpen(index) : toggle(index);
   };

   return (
      <div>
         {items.map((item, index) => (
            <div
               key={index}
               style={{ border: '1px solid #ccc', marginBottom: 8 }}
            >
               <button
                  onClick={() => handleClick(index)}
                  style={{ width: '100%', textAlign: 'left', padding: 8 }}
               >
                  {item.title}
               </button>
               {openIndexes.includes(index) && (
                  <div style={{ padding: 8 }}>{item.content}</div>
               )}
            </div>
         ))}
      </div>
   );
}

export const OneSectionAtATime: Story = {
   args: {
      initialOpenIndexes: [],
      oneAtATime: true,
   },
};

export const WithInitiallyOpenItem: Story = {
   args: {
      initialOpenIndexes: [0],
      oneAtATime: false,
   },
};
