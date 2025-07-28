export { default as Carousel } from './Carousel';
export { NextArrow, PrevArrow } from './components/Arrows';
export { CarouselPagination } from './components/Pagination';
export { useCarousel, carouselReducer } from './Hook/useCarousel';
export type { CarouselProps } from './Carousel';
export type {
   carouselReducerAction,
   carouselState,
   getSlidePropsType,
} from './Hook/useCarousel';
