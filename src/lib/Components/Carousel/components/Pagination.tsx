type CarouselPaginationProps = {
   total: number;
   currentIndex: number;
   onDotClick: (index: number) => void;
};

export function CarouselPagination({
   total,
   currentIndex,
   onDotClick,
}: CarouselPaginationProps) {
   return (
      <div
         className="carousel-pagination"
         role="group"
         aria-label="Carousel pagination"
      >
         {Array.from({ length: total }).map((_, index) => (
            <button
               key={index}
               type="button"
               className={`carousel-dot ${
                  currentIndex === index ? 'active' : ''
               }`}
               aria-label={`Go to slide ${index + 1}`}
               aria-current={currentIndex === index ? 'true' : undefined}
               tabIndex={0}
               onClick={() => onDotClick(index)}
               onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                     e.preventDefault();
                     onDotClick(index);
                  }
               }}
            />
         ))}
      </div>
   );
}
