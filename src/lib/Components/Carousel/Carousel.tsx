import * as React from 'react';
import { getSlidePropsType, useCarousel } from './Hook/useCarousel';
import { NextArrow, PrevArrow } from './components/Arrows';
import { CarouselPagination } from './components/Pagination';
import './Carousel.scss';

// export slide component
// still need to add Announce slide changes for screen readers.
// auto adjust on half touch (need to change how transformation get perform).
// multiple slides.

export interface CarouselProps
   extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
   speed?: number;
   fade?: boolean;
   carouselData: any[];
   PrevArrowComponent?: (props: { prevSlide: () => void }) => React.ReactNode;
   NextArrowComponent?: (props: { nextSlide: () => void }) => React.ReactNode;
   children: ({
      currentIndex,
      getSlideProps,
   }: {
      currentIndex: number;
      getSlideProps: getSlidePropsType;
   }) => React.ReactNode;
}

function Carousel({
   fade = false,
   speed = 500,
   carouselData,
   NextArrowComponent = ({ nextSlide }) => <NextArrow nextSlide={nextSlide} />,
   PrevArrowComponent = ({ prevSlide }) => <PrevArrow prevSlide={prevSlide} />,
   children,
   ...props
}: CarouselProps) {
   const { state, swipeHandle, nextSlide, prevSlide, goTo, getSlideProps } =
      useCarousel({
         currentIndex: 0,
         carouselLength: carouselData.length,
         autoplay: {
            delay: 1000,
         },
      });

   return (
      <>
         <div className="carousel">
            {PrevArrowComponent?.({ prevSlide })}
            <div {...props} className="carousel-track w-1/2" {...swipeHandle}>
               {children({
                  currentIndex: state.currentIndex,
                  getSlideProps: getSlideProps({ fade: fade, speed: speed }),
               })}
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
