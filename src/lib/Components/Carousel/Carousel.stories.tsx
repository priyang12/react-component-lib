import type { Meta, StoryFn } from '@storybook/react';
import Carousel from './Carousel';
import clsx from 'clsx';

export default {
   title: 'Components/Carousel',
   component: Carousel,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Carousel>;

const carouselData = [
   {
      img: 'https://picsum.photos/600/400?image=1074',
      title: 'title 1',
   },
   {
      img: 'https://picsum.photos/600/400?image=1072',
      title: 'title 2',
   },
   {
      img: 'https://picsum.photos/600/400?image=1071',
      title: 'title 3',
   },
   {
      img: 'https://picsum.photos/600/400?image=1079',
      title: 'title 4',
   },
];

export const Template: StoryFn<typeof Carousel> = (args) => (
   <Carousel {...args} carouselData={carouselData}>
      {({ SlideRef, currentIndex, speed, fade, slidStyles }) => (
         <>
            {carouselData.map((item, index) => (
               <>
                  <div
                     className={clsx(`carousel-slide ${fade ? 'fade' : ''}`)}
                     onMouseEnter={() => (SlideRef.current.hover = true)}
                     onMouseLeave={() => (SlideRef.current.hover = false)}
                     data-index={index}
                     data-current={currentIndex === index}
                     aria-hidden={currentIndex === index}
                     style={slidStyles(speed, fade)}
                  >
                     <img src={item.img} alt={item.title + 'Image'} />
                     <h1>{item.title}</h1>
                  </div>
               </>
            ))}
         </>
      )}
   </Carousel>
);
