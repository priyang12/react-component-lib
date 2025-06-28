import { render } from '@testing-library/react';
import MagnifierOverlay from './MagnifierOverlay';

describe('MagnifierOverlay', () => {
   it('renders the overlay with correct styles', () => {
      const { container } = render(
         <MagnifierOverlay
            src="/test-image.jpg"
            imgWidth={200}
            imgHeight={100}
            zoomLevel={2}
         />
      );

      const overlay = container.firstChild as HTMLElement;

      expect(overlay).toHaveClass('magnifier');
      expect(overlay.style.backgroundImage).toBe(`url("/test-image.jpg")`);
      expect(overlay.style.backgroundRepeat).toBe('no-repeat');
      expect(overlay.style.backgroundSize).toBe('400px 200px'); // 200×2 and 100×2
      expect(overlay.style.backgroundColor).toBe('white');
   });

   it('updates backgroundSize based on zoom level', () => {
      const { container } = render(
         <MagnifierOverlay
            src="/image.jpg"
            imgWidth={300}
            imgHeight={150}
            zoomLevel={3}
         />
      );

      const overlay = container.firstChild as HTMLElement;
      expect(overlay.style.backgroundSize).toBe('900px 450px'); // 3× zoom
   });
});
