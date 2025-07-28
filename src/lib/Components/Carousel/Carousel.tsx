import * as React from 'react';
import { getSlidePropsType, useCarousel } from './Hook/useCarousel';
import { NextArrow, PrevArrow } from './components/Arrows';
import { CarouselPagination } from './components/Pagination';
import './Carousel.scss';

// multiple slides.
// auto adjust on half touch (need to change how transformation get perform).
// still need to add Announce slide changes for screen readers.

/**
 * Props for the Carousel component.
 *
 * Extends native `div` props (excluding `children`) and adds carousel-specific configuration like
 * transition speed, fade animation, custom arrow components, and a render-prop-based child renderer.
 *
 * @property speed - Time in milliseconds for the transition animation between slides.
 * @property fade - If `true`, uses fade animation instead of sliding.
 * @property carouselLength - Total number of slides in the carousel.
 * @property PrevArrowComponent - Optional custom previous arrow component. Receives a `prevSlide` function.
 * @property NextArrowComponent - Optional custom next arrow component. Receives a `nextSlide` function.
 * @property children - Render prop function that receives `currentIndex` and `getSlideProps`, and returns slide content.
 */
export interface CarouselProps
   extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
   /** Time (in ms) to animate between slides. */
   speed?: number;

   /** Whether to fade between slides instead of sliding. */
   fade?: boolean;

   /** Number of total slides in the carousel. */
   carouselLength: number;

   /** Custom previous arrow component. Receives a function to move to the previous slide. */
   PrevArrowComponent?: (props: { prevSlide: () => void }) => React.ReactNode;

   /** Custom next arrow component. Receives a function to move to the next slide. */
   NextArrowComponent?: (props: { nextSlide: () => void }) => React.ReactNode;

   /** Render prop function that receives carousel state and returns JSX for slides. */
   children: (params: {
      /** The index of the currently active slide. */
      currentIndex: number;
      /** Function that returns props to spread onto each slide. */
      getSlideProps: getSlidePropsType;
   }) => React.ReactNode;
}

/**
 * A customizable carousel component with support for fade transitions, custom navigation arrows,
 * and full control over slide rendering via render props.
 *
 * @example
 * ```tsx
 * <Carousel carouselLength={3} speed={500}>
 *   {({ currentIndex, getSlideProps }) => (
 *     <>
 *       <div {...getSlideProps(0)}>Slide 1</div>
 *       <div {...getSlideProps(1)}>Slide 2</div>
 *       <div {...getSlideProps(2)}>Slide 3</div>
 *     </>
 *   )}
 * </Carousel>
 * ```
 */

function Carousel({
   fade = false,
   speed = 500,
   carouselLength,
   NextArrowComponent = ({ nextSlide }) => <NextArrow nextSlide={nextSlide} />,
   PrevArrowComponent = ({ prevSlide }) => <PrevArrow prevSlide={prevSlide} />,
   children,
   ...props
}: CarouselProps) {
   const { state, swipeHandle, nextSlide, prevSlide, goTo, getSlideProps } =
      useCarousel({
         currentIndex: 0,
         carouselLength: carouselLength,
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
