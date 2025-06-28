import * as React from 'react';
import { clsx } from 'clsx';
import MagnifierOverlay, { MagnifierOverlayProps } from './MagnifierOverlay';
import { useImageMagnifier } from './Hook/useImageMagnifier';
import './ImageMagnifier.scss';

/**
 * Props for the ImageMagnifier component.
 *
 * Enables zoomed-in magnification of an image using a movable lens overlay.
 *
 * @property src - Source URL of the image to be magnified.
 * @property magnifierHeight - Height of the magnifier lens in pixels.
 * @property magnifierWidth - Width of the magnifier lens in pixels.
 * @property zoomLevel - Magnification level. For example, `2` means 2× zoom.
 * @property OverlayComponent - Optional custom component to render the magnifier overlay. Defaults to the built-in `MagnifierOverlay`.
 * @property OverlayComponentProps - Optional props to be passed to the `OverlayComponent`.
 * @property renderImage - Render prop that receives event handlers for mouse interactions and returns the image element.
 */
export interface ImageMagnifierProps
   extends React.ComponentPropsWithoutRef<'div'> {
   /** Image source to be displayed and magnified. */
   src: string;
   /** Height of the magnifier lens in pixels. */
   magnifierHeight: number;
   /** Width of the magnifier lens in pixels. */
   magnifierWidth: number;
   /** The zoom level of the magnified area. */
   zoomLevel: number;
   /** Optional custom overlay component for the magnifier lens. */
   OverlayComponent?: React.ComponentType<MagnifierOverlayProps>;
   /** Optional props for the overlay component. */
   OverlayComponentProps?: MagnifierOverlayProps;
   /** Render prop to display the image with magnifier event bindings. */
   renderImage: (args: {
      handleMouseEnter: (e: React.MouseEvent<HTMLImageElement>) => void;
      handleMouseMove: (e: React.MouseEvent<HTMLImageElement>) => void;
      handleMouseLeave: () => void;
   }) => React.ReactNode;
}

// memoize default component
const MemoedMagnifierOverlay = React.memo(MagnifierOverlay);

/**
 * ImageMagnifier component for adding zoom-on-hover functionality to images.
 *
 * Displays a magnifier overlay when the user hovers over the image.
 * Allows full customization via overlay components and image rendering.
 * Useful for product previews, detailed imagery, or graphical interfaces.
 *
 * @returns A container with zoomable image functionality using mouse events.
 *
 * @example
 *
 * <ImageMagnifier
 *   src="/img/product.png"
 *   zoomLevel={2}
 *   magnifierHeight={150}
 *   magnifierWidth={150}
 *   renderImage={({ handleMouseEnter, handleMouseMove, handleMouseLeave }) => (
 *     <img
 *       src="/img/product.png"
 *       onMouseEnter={handleMouseEnter}
 *       onMouseMove={handleMouseMove}
 *       onMouseLeave={handleMouseLeave}
 *     />
 *   )}
 * />
 */

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
   src,
   magnifierHeight = 100,
   magnifierWidth = 100,
   zoomLevel = 1.5,
   className,
   OverlayComponent = MemoedMagnifierOverlay,
   OverlayComponentProps,
   renderImage,
   ...props
}) => {
   const {
      x,
      y,
      imgHeight,
      imgWidth,
      showMagnifier,
      eventHandlers: { onMouseEnter, onMouseLeave, onMouseMove },
   } = useImageMagnifier();

   return (
      <div
         className={clsx('imageContainer', className)}
         {...props}
         style={Object.assign(
            {
               '--x': `${x}px`,
               '--y': `${y}px`,
               '--magnifierWidth': `${magnifierWidth}px`,
               '--magnifierHeight': `${magnifierHeight}px`,
               '--zoomLevel': zoomLevel,
            } as React.CSSProperties,
            props?.style
         )}
      >
         {renderImage({
            handleMouseEnter: onMouseEnter,
            handleMouseLeave: onMouseLeave,
            handleMouseMove: onMouseMove,
         })}
         {showMagnifier ? (
            <OverlayComponent
               imgWidth={imgWidth}
               imgHeight={imgHeight}
               src={src}
               zoomLevel={zoomLevel}
               {...OverlayComponentProps}
            />
         ) : null}
      </div>
   );
};

export default ImageMagnifier;
