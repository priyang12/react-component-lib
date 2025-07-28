import clsx from 'clsx';
import * as React from 'react';
import { useSwipeable } from 'react-swipeable';

export type carouselState = {
   carouselLength: number;
   currentIndex: number;
   loop: boolean;
};

export type carouselReducerAction = {
   type: 'nextSlide' | 'prevSlide' | 'goToIndex';
   payload: any;
};

export const carouselReducer = (
   state: carouselState,
   action: carouselReducerAction
) => {
   switch (action.type) {
      case 'nextSlide': {
         const isLastSlide = state.currentIndex === state.carouselLength - 1;
         const nextIndex = isLastSlide
            ? state.loop
               ? 0
               : state.currentIndex
            : state.currentIndex + 1;

         return {
            ...state,
            currentIndex: nextIndex,
         };
      }

      case 'prevSlide': {
         const isFirstSlide = state.currentIndex === 0;
         const prevIndex = isFirstSlide
            ? state.loop
               ? state.carouselLength - 1
               : 0
            : state.currentIndex - 1;

         return {
            ...state,
            currentIndex: prevIndex,
         };
      }

      case 'goToIndex': {
         let checkIndex = action.payload.Index;
         if (action.payload.Index >= state.carouselLength) {
            console.error(
               "The Index that was Provided in 'goToIndex' is Invalid and More than the length"
            );
            checkIndex = state.carouselLength - 1;
         }
         if (action.payload.Index < 0) {
            console.error(
               "The Index that was Provided in 'goToIndex' is Invalid due to it can't be less than 0."
            );
            checkIndex = 0;
         }

         return {
            ...state,
            currentIndex: checkIndex,
         };
      }
      default: {
         return state;
      }
   }
};

type useHookType = {
   carouselLength?: number;
   currentIndex?: number;
   loop?: boolean;
   autoplay?: {
      delay?: number;
   };
};

// current ability
// change the state forward and backward
// loop through slides if needed
// auto change the next slides.

export type getSlidePropsType = (index: number) => {
   'data-index': number;
   'data-current': boolean;
   'aria-hidden': boolean;
   className: string;
   style: React.CSSProperties;
   onMouseEnter: () => void;
   onMouseLeave: () => void;
   onTouchStart: () => void;
   onTouchEnd: () => void;
};

export const useCarousel = ({
   carouselLength = 0,
   currentIndex = 0,
   loop = true,
   autoplay,
}: useHookType) => {
   const SlideRef = React.useRef<any>({ hover: false });
   const [state, dispatch] = React.useReducer(carouselReducer, {
      carouselLength,
      currentIndex,
      loop,
   });

   React.useEffect(() => {
      let interval: ReturnType<typeof setTimeout>;
      if (autoplay) {
         interval = setInterval(() => {
            if (SlideRef.current.hover !== true) {
               dispatch({
                  type: 'nextSlide',
                  payload: {},
               });
            }
         }, autoplay?.delay);
      }
      return () => clearInterval(interval);
   }, [autoplay]);

   const nextSlide = () => {
      dispatch({
         type: 'nextSlide',
         payload: {},
      });
   };
   const prevSlide = () => {
      dispatch({
         type: 'prevSlide',
         payload: {},
      });
   };

   const goTo = (index: number) => {
      dispatch({
         type: 'goToIndex',
         payload: {
            Index: index,
         },
      });
   };

   // later create a own hook and replace the package.
   const swipeHandle = useSwipeable({
      onSwipedLeft: () => prevSlide(),
      onSwipedRight: () => nextSlide(),
   });

   const onMouseEnter = () => {
      SlideRef.current.hover = true;
   };
   const onMouseLeave = () => {
      SlideRef.current.hover = false;
   };
   const onTouchStart = () => {
      SlideRef.current.hover = true;
   };
   const onTouchEnd = () => {
      SlideRef.current.hover = false;
   };

   const stopSlides = () => {
      return { onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd };
   };

   const getSlideProps = (para: { speed: number; fade: boolean }) => {
      const styles = slidStyles(para.speed, para.fade);
      return (index: number) => {
         return {
            'data-index': index,
            'data-current': currentIndex === index,
            'aria-hidden': !(currentIndex === index),
            className: `carousel-slide ${para.fade ? 'fade' : ''}`,
            style: styles,
            onMouseEnter,
            onMouseLeave,
            onTouchStart,
            onTouchEnd,
         };
      };
   };

   const slideContainerStyles = React.useCallback(() => {
      return {
         display: 'flex',
         position: 'relative',
         overflow: 'hidden',
      } as React.CSSProperties;
   }, []);

   const slidStyles = React.useCallback(
      (speed: number, fade: boolean) => {
         const fadeStyles = {
            transform: `translateX(-${(state.currentIndex * 100) / 1}%)`,
         } as React.CSSProperties;

         const slideStyle = {
            transform: `translateX(-${(state.currentIndex * 100) / 1}%)`,
            transitionProperty: 'transform',
         };

         return {
            flexShrink: 0,
            transitionDuration: `${speed / 1000}s`,
            transitionTimingFunction: 'ease-in-out',
            ...(fade ? fadeStyles : slideStyle),
         } as React.CSSProperties;
      },
      [state.currentIndex]
   );

   return {
      state,
      SlideRef,
      swipeHandle,
      nextSlide,
      prevSlide,
      goTo,
      stopSlides,
      slidStyles,
      slideContainerStyles,
      getSlideProps,
   };
};
