import * as React from 'react';

export type carouselState = {
   carouselLength: number;
   currentIndex: number;
   loop: boolean;
};

export type carouselReducerAction = {
   type: 'nextSlide' | 'prevSlide' | 'goToIndex';
   payload: any;
};

const carouselReducer = (
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

export const useCarousel = ({
   carouselLength = 0,
   currentIndex = 0,
   loop = true,
   autoplay,
}: useHookType) => {
   const [state, dispatch] = React.useReducer(carouselReducer, {
      carouselLength,
      currentIndex,
      loop,
   });

   // need work for giving ablity to stop the loop if needed.
   React.useEffect(() => {
      let interval: number;
      if (autoplay) {
         interval = setInterval(() => {
            dispatch({
               type: 'nextSlide',
               payload: {},
            });
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
   return {
      state,
      nextSlide,
      prevSlide,
      goTo,
   };
};
