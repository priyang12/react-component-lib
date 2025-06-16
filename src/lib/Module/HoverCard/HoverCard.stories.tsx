import {
   HoverCard,
   CardBottom,
   CardImage,
   CardWrapper,
   HiddenCard,
} from './HoverCard';
import type { Meta, StoryFn } from '@storybook/react';
import { FaClock, FaEye } from 'react-icons/fa';
import { ButtonGroup } from '../ButtonGroup';
import { Button } from '../../Atoms';

export default {
   title: 'Module/HoverCard',
   component: HoverCard,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof HoverCard>;

export const Template: StoryFn<typeof HoverCard> = (args) => (
   <CardWrapper>
      <HoverCard {...args}>
         <CardImage PreviewTitle={'"Preview"'}>
            <img
               src="https://i.ytimg.com/vi/eHXcd_DfUmg/maxresdefault.jpg"
               alt="The Best of Ed Sheeran"
            />
         </CardImage>
         <CardBottom>
            <h2>Ed Sheena</h2>
            <div className="card__info-item">
               <FaClock />
               <span>Time 14:00</span>
            </div>
            <div className="card__info-item">
               <FaEye />
               <span>1.5 min</span>
            </div>
         </CardBottom>
      </HoverCard>
      <HiddenCard>
         <div className="card__content">
            <h1 className="card__image">
               <a href="https://www.youtube.com/watch?v=eHXcd_DfUmg">
                  The Best of Ed Sheeran
               </a>
            </h1>

            <ButtonGroup flexDir="column">
               <Button className="btn btn--primary">Watch Now</Button>
               <Button className="btn btn--secondary">
                  Add to Watch Later
               </Button>
            </ButtonGroup>
         </div>
      </HiddenCard>
   </CardWrapper>
);
