import React from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export function NextArrow({
   nextSlide,
   ...props
}: { nextSlide: () => void } & React.ComponentPropsWithoutRef<'svg'>) {
   return (
      <FiChevronRight
         className="arrow next-arrow"
         tabIndex={0}
         role="button"
         aria-label="Next Slide"
         onClick={nextSlide}
         onKeyDown={(e) => {
            if (e.key === 'Enter') nextSlide();
         }}
         {...props}
      />
   );
}

export function PrevArrow({
   prevSlide,
   ...props
}: { prevSlide: () => void } & React.ComponentPropsWithoutRef<'svg'>) {
   return (
      <FiChevronLeft
         className="arrow prev-arrow"
         tabIndex={0}
         role="button"
         aria-label="Prev Slide"
         onClick={prevSlide}
         onKeyDown={(e) => {
            if (e.key === 'Enter') prevSlide();
         }}
         {...props}
      />
   );
}
