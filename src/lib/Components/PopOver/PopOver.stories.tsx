import type { Meta, StoryFn } from '@storybook/react';
import PopOver from './PopOver';
import { Button } from '../Button';

export default {
   title: 'Components/PopOver',
   component: PopOver.Container,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof PopOver.Container>;

export const Template: StoryFn<typeof PopOver> = (args) => (
   <PopOver.Container {...args}>
      <PopOver.Trigger>
         <Button>Open</Button>
      </PopOver.Trigger>
      <PopOver.Content>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
         placeat labore impedit in saepe, atque tempora aspernatur consequuntur
         iure unde velit odio nulla harum mollitia rerum quo adipisci ipsam
         sequi.
         <PopOver.Close />
      </PopOver.Content>
   </PopOver.Container>
);
