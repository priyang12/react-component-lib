import * as React from 'react';
import { clsx } from 'clsx';
import MagnifierOverlay, { MagnifierOverlayProps } from './MagnifierOverlay';
import { useImageMagnifier } from './Hook/useImageMagnifier';
import './ImageMagnifier.scss';

export interface ImageMagnifierProps
   extends React.ComponentPropsWithoutRef<'div'> {
   src: string;
   magnifierHeight: number;
   magnifierWidth: number;
   zoomLevel: number;
   OverlayComponent?: React.ComponentType<MagnifierOverlayProps>;
   OverlayComponentProps?: MagnifierOverlayProps;
   renderImage: (args: {
      handleMouseEnter: (e: React.MouseEvent<HTMLImageElement>) => void;
      handleMouseMove: (e: React.MouseEvent<HTMLImageElement>) => void;
      handleMouseLeave: () => void;
   }) => React.ReactNode;
}

const MemoedMagnifierOverlay = React.memo(MagnifierOverlay);

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
