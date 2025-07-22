import * as React from 'react';
import { useCarousel } from './Hook/useCarousel';
import { NextArrow, PrevArrow } from './components/Arrows';
import { CarouselPagination } from './components/Pagination';
import './Carousel.scss';

// export slide component
// still need to add Announce slide changes for screen readers.

export interface CarouselProps
   extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
   speed?: number;
   fade?: boolean;
   carouselData: any[];
   PrevArrowComponent?: (props: { prevSlide: () => void }) => React.ReactNode;
   NextArrowComponent?: (props: { nextSlide: () => void }) => React.ReactNode;
   children: ({
      SlideRef,
      currentIndex,
      speed,
      fade,
      slidStyles,
   }: {
      SlideRef: React.MutableRefObject<any>;
      currentIndex: number;
      speed: number;
      fade: boolean;
      slidStyles: (speed: number, fade: boolean) => React.CSSProperties;
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
   const { state, SlideRef, nextSlide, prevSlide, slidStyles, goTo } =
      useCarousel({
         currentIndex: 0,
         carouselLength: carouselData.length,
      });

   return (
      <>
         <div className="carousel">
            {PrevArrowComponent?.({ prevSlide })}
            <div {...props} className="carousel-track w-1/2">
               {children({
                  currentIndex: state.currentIndex,
                  fade,
                  SlideRef,
                  speed,
                  slidStyles,
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
