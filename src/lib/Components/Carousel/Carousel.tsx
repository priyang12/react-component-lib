import * as React from 'react';
import { useCarousel } from './Hook/useCarousel';
import { NextArrow, PrevArrow } from './components/Arrows';
import { CarouselPagination } from './components/Pagination';
import './Carousel.scss';
import clsx from 'clsx';

// Focus On Select

export interface CarouselProps extends React.ComponentPropsWithoutRef<'div'> {
   speed?: number;
   fade?: boolean;
   PrevArrowComponent?: (props: { prevSlide: () => void }) => React.ReactNode;
   NextArrowComponent?: (props: { nextSlide: () => void }) => React.ReactNode;
}

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

function Carousel({
   fade = false,
   speed = 500,
   NextArrowComponent = ({ nextSlide }) => <NextArrow nextSlide={nextSlide} />,
   PrevArrowComponent = ({ prevSlide }) => <PrevArrow prevSlide={prevSlide} />,
   ...props
}: CarouselProps) {
   const { state, SlideRef, nextSlide, prevSlide, slidStyles, goTo } =
      useCarousel({
         currentIndex: 0,
         carouselLength: carouselData.length,
         autoplay: { delay: 1000 },
      });

   return (
      <>
         <div className="carousel">
            {PrevArrowComponent?.({ prevSlide })}
            <div {...props} className="carousel-track w-1/2">
               {carouselData.map((item, index) => (
                  <>
                     <div
                        className={clsx('carousel-slide', {
                           fade: 'fade',
                        })}
                        onMouseEnter={() => (SlideRef.current.hover = true)}
                        onMouseLeave={() => (SlideRef.current.hover = false)}
                        data-index={index}
                        data-current={state.currentIndex === index}
                        aria-hidden={state.currentIndex === index}
                        style={slidStyles(speed, fade)}
                     >
                        <img src={item.img} alt={item.title + 'Image'} />
                        <h1>{item.title}</h1>
                     </div>
                  </>
               ))}
            </div>
            {NextArrowComponent?.({ nextSlide })}
            <CarouselPagination
               currentIndex={state.currentIndex}
               onDotClick={(index) => goTo(index)}
               total={state.carouselLength}
            />
         </div>
      </>
   );
}

export default Carousel;
