import { render } from '@testing-library/react';
import ImageMagnifier from './ImageMagnifier';
import { useImageMagnifier } from './Hook/useImageMagnifier';
import { vi } from 'vitest';

// Mock the magnifier overlay
vi.mock('./MagnifierOverlay', () => ({
   __esModule: true,
   default: ({ src }: { src: string }) => (
      <div data-testid="magnifier-overlay">Zooming {src}</div>
   ),
}));

const defaultHookReturn = {
   x: 50,
   y: 100,
   imgWidth: 400,
   imgHeight: 300,
   showMagnifier: true,
   eventHandlers: {
      onMouseEnter: vi.fn(),
      onMouseLeave: vi.fn(),
      onMouseMove: vi.fn(),
   },
};

describe('ImageMagnifier', () => {
   it('renders the image using renderImage prop', () => {
      vi.mock('./Hook/useImageMagnifier', () => ({
         useImageMagnifier: vi.fn(() => defaultHookReturn),
      }));
      const { getByAltText } = render(
         <ImageMagnifier
            src="/product.jpg"
            zoomLevel={2}
            magnifierHeight={120}
            magnifierWidth={120}
            renderImage={({
               handleMouseEnter,
               handleMouseMove,
               handleMouseLeave,
            }) => (
               <img
                  src="/product.jpg"
                  alt="zoomable"
                  onMouseEnter={handleMouseEnter}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
               />
            )}
         />
      );

      expect(getByAltText('zoomable')).toBeInTheDocument();
   });

   it('renders the overlay component when showMagnifier is true', () => {
      vi.mock('./Hook/useImageMagnifier', () => ({
         useImageMagnifier: vi.fn(() => defaultHookReturn),
      }));
      const { getByTestId } = render(
         <ImageMagnifier
            src="/product.jpg"
            zoomLevel={2}
            magnifierHeight={150}
            magnifierWidth={150}
            renderImage={() => <img src="/product.jpg" alt="product" />}
         />
      );

      expect(getByTestId('magnifier-overlay')).toHaveTextContent(
         'Zooming /product.jpg'
      );
   });

   it('applies dynamic CSS variables for magnifier config', () => {
      vi.mock('./Hook/useImageMagnifier', () => ({
         useImageMagnifier: vi.fn(() => defaultHookReturn),
      }));
      const { container } = render(
         <ImageMagnifier
            src="/img.jpg"
            zoomLevel={2}
            magnifierHeight={150}
            magnifierWidth={180}
            renderImage={() => <img src="/img.jpg" alt="preview" />}
         />
      );

      const style = container.firstChild as HTMLElement;
      expect(style.style.getPropertyValue('--x')).toBe('50px');
      expect(style.style.getPropertyValue('--y')).toBe('100px');
      expect(style.style.getPropertyValue('--zoomLevel')).toBe('2');
      expect(style.style.getPropertyValue('--magnifierHeight')).toBe('150px');
      expect(style.style.getPropertyValue('--magnifierWidth')).toBe('180px');
   });

   it('does not render overlay if showMagnifier is false', () => {
      vi.mocked(useImageMagnifier).mockImplementationOnce(() => ({
         ...defaultHookReturn,
         showMagnifier: false,
         x: 0,
         y: 0,
      }));

      const { queryByTestId } = render(
         <ImageMagnifier
            src="/img.jpg"
            zoomLevel={2}
            magnifierHeight={100}
            magnifierWidth={100}
            renderImage={() => <img src="/img.jpg" alt="img" />}
         />
      );

      expect(queryByTestId('magnifier-overlay')).not.toBeInTheDocument();
   });
});
