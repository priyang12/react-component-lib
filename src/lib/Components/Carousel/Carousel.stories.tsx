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

type StoryType = StoryFn<typeof Carousel>;

export const Default: StoryType = (args) => {
   return (
      <Carousel {...args} carouselData={carouselData}>
         {({ getSlideProps }) => {
            return (
               <>
                  {carouselData.map((item, index) => (
                     <div {...getSlideProps(index)}>
                        <img src={item.img} alt={item.title + 'Image'} />
                        <h1>{item.title}</h1>
                     </div>
                  ))}
               </>
            );
         }}
      </Carousel>
   );
};

export const Speed = Default.bind({});
Speed.args = {
   speed: 5000,
};

export const FadeAnimation = Default.bind({});
FadeAnimation.args = {
   fade: true,
};

export const CustomProps: StoryType = (args) => {
   return (
      <Carousel {...args} carouselData={carouselData}>
         {({ getSlideProps, currentIndex }) => (
            <>
               {carouselData.map((item, index) => {
                  const {
                     className,
                     style,
                     onMouseEnter,
                     onMouseLeave,
                     onTouchEnd,
                     onTouchStart,
                  } = getSlideProps(index);
                  return (
                     <>
                        <div
                           className={clsx(className)}
                           onMouseEnter={onMouseEnter}
                           onMouseLeave={onMouseLeave}
                           onTouchStart={onTouchEnd}
                           onTouchEnd={onTouchStart}
                           data-index={index}
                           data-current={currentIndex === index}
                           aria-hidden={currentIndex === index}
                           style={style}
                        >
                           <img src={item.img} alt={item.title + 'Image'} />
                           <h1>{item.title}</h1>
                        </div>
                     </>
                  );
               })}
            </>
         )}
      </Carousel>
   );
};
