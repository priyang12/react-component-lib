import type { Meta, StoryFn } from '@storybook/react';
import GridLayout from './GridLayout';
import { GridItem } from './GridItem';

export default {
   title: 'Layouts/GridLayout',
   component: GridLayout,
} as Meta<typeof GridLayout>;

export const Default: StoryFn<typeof GridLayout> = (args) => (
   <GridLayout gridNumber={4} {...args}>
      <GridItem
         className="border-2 border-solid border-blue-500 bg-[var(--bg-surface)] text-[var(--text-primary)]"
         column="1 / 2"
      >
         Box one
      </GridItem>
      <GridItem
         className="border-2 border-solid border-blue-500 bg-[var(--bg-surface)] text-[var(--text-primary)]"
         column="2 / 3"
         row="2/3"
      >
         Box two
      </GridItem>
      <GridItem
         className="border-2 border-solid border-blue-500 bg-[var(--bg-surface)] text-[var(--text-primary)]"
         column="3 / 4"
         row="3/4"
      >
         Box Three
      </GridItem>
      <GridItem
         className="border-2 border-solid border-blue-500 bg-[var(--bg-surface)] text-[var(--text-primary)]"
         column="4 / 5"
         row="4/5"
      >
         Box Four
      </GridItem>
   </GridLayout>
);

export const Responsive: StoryFn<typeof GridLayout> = (args) => (
   <GridLayout gridNumber={16} {...args}>
      <GridItem
         span={{ mobile: 4, tablet: 8, desktop: 15 }}
         className="border-2 border-solid border-blue-500 bg-[var(--bg-surface)] text-[var(--text-primary)]"
      >
         Responsive Grid Item
      </GridItem>
   </GridLayout>
);

export const Nested: StoryFn<typeof GridLayout> = (args) => (
   <GridLayout gridNumber={12} gap="1rem" {...args}>
      <GridItem span={12} className="p-4 border bg-blue-100">
         Parent Grid Item
         <GridLayout gridNumber={4} gap="0.5rem" className="mt-4">
            <GridItem span={2} className="bg-blue-100 p-2 text-center">
               Nested 1
            </GridItem>
            <GridItem span={2} className="bg-blue-200 p-2 text-center">
               Nested 2
            </GridItem>
         </GridLayout>
      </GridItem>
   </GridLayout>
);

export const DummyDashboard: StoryFn<typeof GridLayout> = (args) => (
   <GridLayout
      style={{
         '--grid-gap': '1rem',
         '--grid-layout-number': 16,
         '--grid-template-areas': `
            "header header header header header header header header header header header header header header header header"
            "sidebar sidebar sidebar sidebar main main main main main main main main main main main main"
         `,
      }}
      {...args}
   >
      {/* Header */}
      <GridItem
         area="header"
         className="bg-blue-500 text-white p-4 text-xl font-bold"
      >
         Dashboard Header
      </GridItem>

      {/* Sidebar */}
      <GridItem area="sidebar" className="bg-gray-100 p-4 text-gray-700">
         <ul className="space-y-2 flex md:flex-col">
            <li>🏠 Home</li>
            <li>📊 Analytics</li>
            <li>⚙️ Settings</li>
         </ul>
      </GridItem>

      {/* Main content */}
      <GridItem area="main" className="p-4 bg-white space-y-4">
         <div className="flex flex-col xl:flex-row gap-4">
            <div className="bg-green-100 p-4 text-center rounded">
               Stat Card 1
            </div>
            <div className="bg-yellow-100 p-4 text-center rounded">
               Stat Card 2
            </div>
            <div className="bg-red-100 p-4 text-center rounded">
               Stat Card 3
            </div>
            <div className="bg-purple-100 p-4 text-center rounded">
               Stat Card 4
            </div>
         </div>

         <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
         </div>
      </GridItem>
   </GridLayout>
);
