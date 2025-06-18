import {
   YTCard,
   CardBottom,
   CardImage,
   CardWrapper,
   HiddenCard,
} from './YTCard';
import type { Meta, StoryFn } from '@storybook/react';
import { FaClock, FaEye } from 'react-icons/fa';
import { ButtonGroup } from '../ButtonGroup';
import { Button } from '../Button';

export default {
   title: 'Inspiration/YTCard',
   component: YTCard,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof YTCard>;

export const Template: StoryFn<typeof YTCard> = (args) => (
   <CardWrapper>
      <YTCard {...args}>
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
      </YTCard>
      <HiddenCard>
         <div className="card__content">
            <h1 className="card__image">
               <a href="https://www.youtube.com/watch?v=eHXcd_DfUmg">
                  The Best of Ed Sheeran
               </a>
            </h1>

            <ButtonGroup>
               <Button className="btn btn--primary">Watch Now</Button>
               <Button className="btn btn--secondary">
                  Add to Watch Later
               </Button>
            </ButtonGroup>
         </div>
      </HiddenCard>
   </CardWrapper>
);
