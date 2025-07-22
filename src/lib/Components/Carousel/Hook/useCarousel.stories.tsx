import type { Meta } from '@storybook/react';
import { useCarousel } from './useCarousel';

import { Input } from '../../Input';

export default {
   title: 'Hooks/useCarousel',
   component: HookDemo,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof HookDemo>;

const numbersArray: number[] = [];
for (let i = 0; i < 10; i++) {
   numbersArray.push(i);
}

export function HookDemo() {
   const {
      state,
      nextSlide,
      prevSlide,
      goTo,
      slidStyles,
      slideContainerStyles,
   } = useCarousel({
      currentIndex: 0,
      carouselLength: numbersArray.length,
      loop: false,
      // autoplay: { delay: 1000 },
   });

   return (
      <div className="text-white flex flex-col">
         <div className="flex">
            <button onClick={prevSlide}>prev</button>
            <div style={slideContainerStyles()}>
               {numbersArray.map((item, index) => (
                  <>
                     <div
                        className="flex-shrink-0 w-full bg-gray-500"
                        data-index={index}
                        data-current={state.currentIndex === index}
                        aria-hidden={state.currentIndex === index}
                        style={slidStyles(500, false)}
                     >
                        {numbersArray[index]}
                     </div>
                  </>
               ))}
            </div>
            <button onClick={nextSlide}>next</button>
         </div>
         <Input
            InputSize="medium"
            type="text"
            onChange={(e) => goTo(Number(e.target.value))}
         />
      </div>
   );
}
