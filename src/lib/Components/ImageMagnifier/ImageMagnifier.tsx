import * as React from 'react';
import MagnifierOverlay from './MagnifierOverlay';
import { clsx } from 'clsx';
import './ImageMagnifier.scss';

export interface ImageMagnifierProps
   extends React.ComponentPropsWithoutRef<'div'> {
   src: string;
   width: string;
   height: string;
   magnifierHeight: number;
   magnifierWidth: number;
   zoomLevel: number;
}

const MemoedMagnifierOverlay = React.memo(MagnifierOverlay);

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
   src,
   width,
   height,
   magnifierHeight = 100,
   magnifierWidth = 100,
   zoomLevel = 1.5,
   className,
   ...props
}) => {
   const [[x, y], setXY] = React.useState([0, 0]);
   const [[imgWidth, imgHeight], setSize] = React.useState([0, 0]);
   const [showMagnifier, setShowMagnifier] = React.useState(false);

   const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget.getBoundingClientRect();
      setSize([width, height]);
      setShowMagnifier(true);
   };

   const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
      const { top, left } = e.currentTarget.getBoundingClientRect();
      const x = e.pageX - left - window.pageXOffset;
      const y = e.pageY - top - window.pageYOffset;
      setXY([x, y]);
   };

   const handleMouseLeave = () => {
      setShowMagnifier(false);
   };

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
         <img
            src={src}
            alt="Zoomable"
            style={{ width, height }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
         />

         {showMagnifier ? (
            <MemoedMagnifierOverlay
               imgWidth={imgWidth}
               imgHeight={imgHeight}
               src={src}
               zoomLevel={zoomLevel}
            />
         ) : null}
      </div>
   );
};

export default ImageMagnifier;
