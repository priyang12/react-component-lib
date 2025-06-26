import type { Meta, StoryFn } from '@storybook/react';
import Spacer from './Spacer';

export default {
   title: 'Helper/Spacer',
   component: Spacer,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Spacer>;

export const Vertical: StoryFn<typeof Spacer> = (args) => (
   <div className="text-[var(--text-primary)]">
      <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
         deleniti culpa, porro quidem quia autem sint doloremque deserunt
         eligendi molestiae qui consectetur alias ea vitae pariatur debitis rem
         libero incidunt.
      </p>
      <Spacer {...args} direction="vertical" />
      <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
         deleniti culpa, porro quidem quia autem sint doloremque deserunt
         eligendi molestiae qui consectetur alias ea vitae pariatur debitis rem
         libero incidunt.
      </p>
   </div>
);
export const horizontal: StoryFn<typeof Spacer> = (args) => (
   <div className="flex justify-between text-[var(--text-primary)]">
      <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
         deleniti culpa, porro quidem quia autem sint doloremque deserunt
         eligendi molestiae qui consectetur alias ea vitae pariatur debitis rem
         libero incidunt.
      </p>
      <Spacer
         {...args}
         size="xl"
         direction="horizontal"
         style={{
            display: 'inline-block',
            width: 100,
            height: '10rem',
            background: 'hotpink',
         }}
      />

      <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
         deleniti culpa, porro quidem quia autem sint doloremque deserunt
         eligendi molestiae qui consectetur alias ea vitae pariatur debitis rem
         libero incidunt.
      </p>
   </div>
);
