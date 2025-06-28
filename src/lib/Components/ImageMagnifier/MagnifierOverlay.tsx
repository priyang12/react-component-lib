import React from 'react';
import './ImageMagnifier.scss';

/**
 * Props for the MagnifierOverlay component.
 *
 * Defines the overlay that appears when zooming into an image with the `ImageMagnifier` component.
 *
 * @property imgWidth - Original width of the image in pixels.
 * @property imgHeight - Original height of the image in pixels.
 * @property src - Source URL of the image to be magnified.
 * @property zoomLevel - Zoom scale factor to apply to the magnifier.
 */
export interface MagnifierOverlayProps
   extends React.ComponentPropsWithoutRef<'div'> {
   /** Width of the source image in pixels. */
   imgWidth: number;
   /** Height of the source image in pixels. */
   imgHeight: number;
   /** Source URL of the image. */
   src: string;
   /** Zoom level for magnification (e.g., 2 = 200% zoom). */
   zoomLevel: number;
}

/**
 * MagnifierOverlay component used by `ImageMagnifier` to create a zoomed view.
 *
 * Renders a background image with scaled dimensions to simulate a magnifier effect.
 * Positioned and styled by the parent using custom properties.
 *
 * @returns A `<div>` styled with background image zooming effect.
 *
 * @example
 * <MagnifierOverlay
 *   imgWidth={600}
 *   imgHeight={400}
 *   src="/images/product.jpg"
 *   zoomLevel={2}
 * />
 */
const MagnifierOverlay: React.FC<MagnifierOverlayProps> = ({
   imgWidth,
   imgHeight,
   src,
   zoomLevel,
}) => {
   return (
      <div
         className="magnifier"
         data-testid="magnifier-overlay"
         style={
            {
               backgroundColor: 'white',
               backgroundImage: `url('${src}')`,
               backgroundRepeat: 'no-repeat',
               backgroundSize: `${imgWidth * zoomLevel}px ${
                  imgHeight * zoomLevel
               }px`,
            } as React.CSSProperties
         }
      />
   );
};

export default MagnifierOverlay;
