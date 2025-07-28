import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

describe('Carousel', () => {
   it('renders without crashing', () => {
      render(<Carousel carouselLength={3}>{() => <div>Slide</div>}</Carousel>);
   });

   it('renders correct number of slides', () => {
      const { getAllByText } = render(
         <Carousel carouselLength={3}>
            {({ getSlideProps }) => (
               <>
                  <div {...getSlideProps(0)}>Slide 1</div>
                  <div {...getSlideProps(1)}>Slide 2</div>
                  <div {...getSlideProps(2)}>Slide 3</div>
               </>
            )}
         </Carousel>
      );

      const slides = getAllByText(/Slide \d/);
      expect(slides).toHaveLength(3);
   });

   it('marks the correct slide as current', () => {
      const { getByText } = render(
         <Carousel carouselLength={2}>
            {({ getSlideProps }) => (
               <>
                  <div {...getSlideProps(0)}>Slide 1</div>
                  <div {...getSlideProps(1)}>Slide 2</div>
               </>
            )}
         </Carousel>
      );

      expect(getByText('Slide 1').dataset.current).toBe('true');
      expect(getByText('Slide 2').dataset.current).toBe('false');
   });

   it('resets to first slide after last', () => {
      const { getByText } = render(
         <Carousel
            carouselLength={2}
            NextArrowComponent={({ nextSlide }) => (
               <button onClick={nextSlide}>Next</button>
            )}
         >
            {({ getSlideProps }) => (
               <>
                  <div {...getSlideProps(0)}>Slide 1</div>
                  <div {...getSlideProps(1)}>Slide 2</div>
               </>
            )}
         </Carousel>
      );

      const next = getByText('Next');
      fireEvent.click(next); // -> Slide 2
      fireEvent.click(next); // -> Slide 1 (loop)

      expect(getByText('Slide 1').dataset.current).toBe('true');
   });
});
