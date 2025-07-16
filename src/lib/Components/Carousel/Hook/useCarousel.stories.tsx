import type { Meta, StoryFn } from '@storybook/react';
import { useCarousel } from './useCarousel';
import { Divider } from '../../Divider';
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
   const { state, nextSlide, prevSlide, goTo } = useCarousel({
      currentIndex: 0,
      carouselLength: numbersArray.length,
      loop: false,
      // autoplay: { delay: 1000 },
   });

   console.log(state.currentIndex);

   return (
      <div className="text-white">
         <button onClick={nextSlide}>next</button>
         <Divider />
         Data : {numbersArray[state.currentIndex]}
         <Divider />
         <button onClick={prevSlide}>prev</button>
         <Input
            InputSize="medium"
            type="text"
            onChange={(e) => goTo(Number(e.target.value))}
         />
      </div>
   );
}
